require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const Iron = require("@hapi/iron");
const cors = require("cors");
const mongoose = require("mongoose");
const { Faq } = require("./models/faqs");
const { User } = require("./models/user");
const { Order } = require("./models/order");
const { Product } = require("./models/product");
const { Category } = require("./models/category");
const { Admin } = require("./models/admin");
const { populateBackend } = require("./populate_backend");
const { createCategoriesGraph } = require("./categoriesGraph");
const { getAnswerDynamicQuestion } = require("./dynamic_answer_mapper");
const { dynamicQuestions } = require("./dynamic_questions_handler");
const bcrypt = require("bcrypt");
const app = express();

//put ur MONGODB_URI in .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", async () => {
  console.log("connected to mongodb");
  populateBackend();//this function call to be used only when db clean up or refilling of data required.
});
const corsOptions = {
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// function flattenQuestionResponse(faqArr){
//     let response = [];
//     for(const faqElem of faqArr){
//         for(let idx=0;idx<faqElem.QuestionText.length;idx++){
//             response.push({...faqElem,QuestionPos:idx,QuestionText: faqElem.QuestionText[idx]});
//         }
//     }
//     return response;
// }
function fetchUserKycFaqs(userFound) {
  if (
    userFound !== null &&
    userFound !== undefined &&
    Object.keys(userFound.toJSON()).length !== 0 &&
    userFound.userKyc.status !== "Completed"
  ) {
    const faqs = userFound.faqs
      .filter(
        (faqDoc) =>
          JSON.stringify(faqDoc.faqCategoryPath) ===
          JSON.stringify(["My Account", "KYC"])
      )
      .flatMap((faqDoc) => {
        const faqResponse = faqDoc.faqQuestionText.map((q, idx) => {
          return {
            QuestionId: faqDoc._id.toString(),
            QuestionPos: idx,
            QuestionText: q,
          };
        });
        return faqResponse;
      });
    return faqs;
  } else {
    return [];
  }
}

function productResponseMap(products, category) {
  //all response mappers will be in a different file.
  let filteredProducts = products instanceof Array ? [] : {};
  switch (category) {
    case "Stocks":
      {
        if (products instanceof Array) {
          filteredProducts = products.map((p) => {
            const { faqId, productPrice, ...fp } = p;
            const { _id, ...productPriceExceptId } = p.productPrice.stockPrice;
            return {
              ...fp,
              _id: fp._id.toString(),
              productPrice: { stockPrice: productPriceExceptId },
            };
          });
        } else {
          const { faqId, productPrice, ...fp } = products;
          const {
            _id,
            ...productPriceExceptId
          } = products.productPrice.stockPrice;
          filteredProducts = {
            ...fp,
            _id: fp._id.toString(),
            productPrice: { stockPrice: productPriceExceptId },
          };
        }
      }
      break;
    case "Mutual Funds":
      {
        if (products instanceof Array) {
          filteredProducts = products.map((p) => {
            const { faqId, productPrice, ...fp } = p;
            const { _id, ...productPriceExceptId } = p.productPrice.fundReturns;
            return {
              ...fp,
              _id: fp._id.toString(),
              productPrice: { fundReturns: productPriceExceptId },
            };
          });
        } else {
          const { faqId, productPrice, ...fp } = products;
          const {
            _id,
            ...productPriceExceptId
          } = products.productPrice.fundReturns;
          filteredProducts = {
            ...fp,
            _id: fp._id.toString(),
            productPrice: { fundReturns: productPriceExceptId },
          };
        }
      }
      break;
    case "FDs":
      {
        if (products instanceof Array) {
          filteredProducts = products.map((p) => {
            const { faqId, productPrice, ...fp } = p;
            const { _id, ...productPriceExceptId } = p.productPrice.fd;
            return {
              ...fp,
              _id: fp._id.toString(),
              productPrice: { fd: productPriceExceptId },
            };
          });
        } else {
          const { faqId, productPrice, ...fp } = products;
          const { _id, ...productPriceExceptId } = products.productPrice.fd;
          filteredProducts = {
            ...fp,
            _id: fp._id.toString(),
            productPrice: { fd: productPriceExceptId },
          };
        }
      }
      break;
    case "Gold":
      {
        if (products instanceof Array) {
          filteredProducts = products.map((p) => {
            const { faqId, productPrice, ...fp } = p;
            return {
              ...fp,
              _id: fp._id.toString(),
              productPrice: { purity: p.productPrice.purity },
            };
          });
        } else {
          const { faqId, productPrice, ...fp } = products;
          filteredProducts = {
            ...fp,
            _id: fp._id.toString(),
            productPrice: { purity: productPrice.purity },
          };
        }
      }
      break;
    default: {
      //do nothing
    }
  }
  return filteredProducts;
}

app.get("/", () => {
  console.log("Welcome to Groww pilot backend");
});

/**Basic Routes */
app.get("/login", async (req, res) => {
  User.findOne({ userName: req.query.userName })
    .select("+userPass")
    .exec(function (err, userFound) {
      if (
        err ||
        userFound === null ||
        userFound === undefined ||
        Object.keys(userFound.toJSON()).length === 0
      ) {
        res.sendStatus(404);
      } else {
        bcrypt.compare(
          req.query.userPass,
          userFound.userPass,
          function (err, result) {
            if (err || result === false) {
              res.sendStatus(404);
            } else {
              Iron.seal(userFound, process.env.SESSION_SECRET, Iron.defaults)
                .then((sealed) => {
                  res
                    .status(200)
                    .cookie(process.env.AUTH_TOKEN_NAME, sealed, {
                      expires: new Date(Date.now() + 900000), //available only for 15 minutes
                      sameSite: "lax",
                      httpOnly: true,
                      secure: process.env.NODE_ENV === "production",
                      path: "/",
                    })
                    .json({
                      userId: userFound._id,
                      userName: userFound.userName,
                    });
                })
                .catch((_) => res.sendStatus(404));
            }
          }
        );
      }
    });
});

app.get("/logout", async (req, res) => {
  try {
    const userId = req.query.user;
    const unsealed = await Iron.unseal(
      req.cookies[process.env.AUTH_TOKEN_NAME],
      process.env.SESSION_SECRET,
      Iron.defaults
    );
    if (unsealed._id.toString() === userId.toString())
      res
        .status(200)
        .clearCookie(process.env.AUTH_TOKEN_NAME)
        .json({ logout: true });
    else throw new Error("Invalid userId");
  } catch (err) {
    res.status(401).json({ logout: false });
  }
});

app.get("/checkAuth", async (req, res) => {
  try {
    const sealed = req.cookies[process.env.AUTH_TOKEN_NAME];
    const userId = req.query.user;
    const unsealed = await Iron.unseal(
      sealed,
      process.env.SESSION_SECRET,
      Iron.defaults
    );
    const user = await User.findById(userId).exec();
    res
      .status(user._id.toString() === unsealed._id.toString() ? 200 : 401)
      .json({ auth: true });
  } catch (err) {
    res.status(401).json({ auth: false });
  }
});

app.get("/getUserDetails/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).exec();
    res.status(200).json({
      userName: user.userName,
      userDOB: user.userDOB,
      userMob: user.userMob,
      userMaritalStatus: user.userMaritalStatus,
      userGender: user.userGender,
    });
  } catch (err) {
    res.sendStatus(404);
  }
});

app.get("/getAllProducts", async (req, res) => {
  const category = req.query.category;
  try {
    let products = await Product.find({ productCategory: category }).exec();
    if (products !== null && products !== undefined && products.length !== 0) {
      products = products.map((p) => p.toJSON());
      res.status(200).json(productResponseMap(products, category));
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.get("/getProductDetails/:productId", async (req, res) => {
  let productId = req.params.productId;
  try {
    let product = await Product.findById(productId).exec();
    product = product.toJSON();
    if (
      product !== null &&
      product !== undefined &&
      Object.keys(product).length !== 0
    ) {
      res
        .status(200)
        .json(productResponseMap(product, product.productCategory));
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.get("/getAllOrders", async (req, res) => {
  //user Id also required
  let category = req.query.category;
  let userId = req.query.user;
  try {
    let allOrders = await Order.find({ $and: [{ category }, { userId }] })
      .populate("productDocs")
      .exec();
    if (
      allOrders !== null &&
      allOrders !== undefined &&
      allOrders.length !== 0
    ) {
      allOrders = allOrders.map((order) => {
        order = order.toObject();
        const products = productResponseMap(order.productDocs, order.category);
        delete order.productDocs;
        delete order.faqId;
        delete order.userId;
        return { ...order, products };
      });
      res.status(200).json(allOrders); //need to filter for fields to be returned
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.get("/getOrderDetails/:orderId", async (req, res) => {
  //user Id also required
  let orderId = req.params.orderId;
  let userId = req.query.user;
  try {
    let order = await Order.findOne({ $and: [{ _id: orderId }, { userId }] })
      .populate("productDocs")
      .exec();
    if (
      order !== null &&
      order !== undefined &&
      Object.keys(order.toJSON()).length !== 0
    ) {
      order = order.toJSON();
      const products = productResponseMap(order.productDocs, order.category);
      delete order.productDocs;
      delete order.faqId;
      delete order.userId;
      res.status(200).json({ ...order, products }); //need for the filter on the fileds to be returned
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.post("/placeOrder", async (req, res) => {
  //orderStatus will be in Not completed state

  const updateUserPromise = (userId, orderId) => {
    return new Promise((resolve, reject) => {
      User.updateOne({ _id: userId }, { $push: { userOrders: orderId } })
        .exec()
        .then((res) => {
          resolve({
            ...res,
          });
        })
        .catch((err) => {
          reject({
            ...err,
          });
        });
    });
  };

  try {
    const userId = req.query.user;
    const user = await User.findById(userId).exec();
    if (user === null || user === undefined || Object.keys(user) === 0) {
      res.sendStatus(404);
    } else {
      const orderFromFrontend = req.body;
      let faqsToBeLinked = await Faq.find({
        faqCategoryPath: { $all: ["Orders", "Pending"] },
      }).exec();
      faqsToBeLinked = faqsToBeLinked.map((faq) => faq._id);
      const newOrder = new Order({
        orderStatus: "Pending",
        faqId: faqsToBeLinked,
        userId,
        ...orderFromFrontend,
      });
      const newOrderDoc = await newOrder.save();
      const linkOrderToUser = await updateUserPromise(userId, newOrderDoc._id);
      res.status(201).json({ orderId: newOrderDoc._id.toString() });
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.patch("/confirmOrder", async (req, res) => {
  const updateOrderPromise = (orderDetails, faqsToBeLinked) => {
    return new Promise((resolve, reject) => {
      Order.updateOne(
        { _id: orderDetails.orderId },
        {
          $set: {
            orderStatus: "Completed",
            orderDate: orderDetails.orderDate,
            faqId: faqsToBeLinked,
          },
        }
      )
        .exec()
        .then((res) => {
          resolve({
            ...res,
          });
        })
        .catch((err) => {
          reject({
            ...err,
          });
        });
    });
  };

  try {
    const userId = req.query.user;
    const user = await User.findById(userId).exec();
    if (user === null || user === undefined || Object.keys(user).length === 0) {
      res.sendStatus(404);
    } else {
      const orderDetails = req.body;
      let faqsToBeLinked = await Faq.find({
        faqCategoryPath: { $all: ["Orders", "Completed"] },
      }).exec();
      faqsToBeLinked = faqsToBeLinked.map((faq) => faq._id);
      let updateOrder = await updateOrderPromise(orderDetails, faqsToBeLinked);
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

app.patch("/cancelOrder", async (req, res) => {
  const updateOrderPromise = (orderDetails, faqsToBeLinked) => {
    return new Promise((resolve, reject) => {
      Order.updateOne(
        { _id: orderDetails.orderId },
        {
          $set: {
            orderStatus: "Cancelled",
            orderDate: orderDetails.orderDate,
            faqId: faqsToBeLinked,
          },
        }
      )
        .exec()
        .then((res) => {
          resolve({
            ...res,
          });
        })
        .catch((err) => {
          reject({
            ...err,
          });
        });
    });
  };

  try {
    const userId = req.query.user;
    const user = await User.findById(userId).exec();
    if (user === null || user === undefined || Object.keys(user).length === 0) {
      res.sendStatus(404);
    } else {
      const orderDetails = req.body;
      let faqsToBeLinked = await Faq.find({
        faqCategoryPath: { $all: ["Orders", "Cancelled"] },
      }).exec();
      faqsToBeLinked = faqsToBeLinked.map((faq) => faq._id);
      let updateOrder = await updateOrderPromise(orderDetails, faqsToBeLinked);
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

/**Chatbot-admin Routes */

app.get("/loginAdmin", async (req, res) => {
  const { userName, userPass } = req.query;
  try {
    const admin = await Admin.findOne({ userName }).exec();
    const isPassMatched = await bcrypt.compare(userPass, admin.userPass);
    if (isPassMatched) {
      const token = await Iron.seal(
        admin,
        process.env.ADMIN_SESSION_SECRET,
        Iron.defaults
      );
      res
        .cookie(process.env.ADMIN_AUTH_TOKEN_NAME, token, {
          expires: new Date(Date.now() + 30 * 60 * 1000), //available only for 30 minutes
          sameSite: "lax",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
        .cookie("userName", admin.userName, {
          expires: new Date(Date.now() + 30 * 60 * 1000), //available only for 30 minutes
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
        .sendStatus(200);
    } else {
      throw new Error("User credentials are not valid");
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

const checkAdminAuth = async (req) => {
  try {
    const sealed = req.cookies[process.env.ADMIN_AUTH_TOKEN_NAME];
    const userName = req.cookies['userName'];
    const unsealed = await Iron.unseal(
      sealed,
      process.env.ADMIN_SESSION_SECRET,
      Iron.defaults
    );
    const user = await Admin.findOne({ userName }).exec(); //can be removed later
    if (user._id.toString() === unsealed._id.toString()) return { auth: true };
    throw new Error("User not signed in");
  } catch (err) {
    return { auth: false };
  }
};

app.get("/getDynamicFuncs", async (req, res) => {
  const dynamicFuncList = Object.keys(dynamicQuestions);
  res.status(200).json({ dynamicFuncList });
});

app.get("/getAllNodes",async (req,res) => {
    try{
        let allCategories = await Category.find({}).exec();
        allCategories = allCategories.map((c)=>c.categoryName);
        res.status(200).json({nodes: allCategories});
    }
    catch(err){
        res.status(404).json({nodes: []});
    }
});

app.post("/addCategory",async (req,res) => {
    try{
        const isAuthenticated = await checkAdminAuth(req);
        if (!isAuthenticated.auth) {
            res
              .clearCookie(process.env.ADMIN_AUTH_TOKEN_NAME)
              .clearCookie("userName")
              .status(401)
              .json({ auth: false });
        }
        else{
            const {categoryName,categoryParent,subCategories} = req.body;
            const categoryObj = new Category({
                categoryName,
                hasSubCategory: (subCategories.length !== 0),
                subCategoryId: [],
                faqId: [],
            });
            const categoryDoc = await categoryObj.save();
            await Category.updateOne({categoryName: categoryParent},{$push: {subCategoryId: categoryDoc._id}}).exec();
            let subCategoryIds = [];
            for(const subCategory of subCategories){
                const subCategoryObj = new Category({
                    categoryName: subCategory,
                    hasSubCategory: false,
                    subCategoryId: [],
                    faqId: [],
                });
                const subCategoryDoc = await subCategoryObj.save();
                subCategoryIds.push(subCategoryDoc._id);
            }
            await Category.updateOne({_id: categoryDoc._id.toString()},{$set: {subCategoryId: subCategoryIds}}).exec();
            res.status(200).json({categoryId: categoryDoc._id.toString(),auth: true});
        }        
    }
    catch(err){
        console.log(err);
        res.status(404).json({error: 'Cannot add the given category'});
    }
})

app.post("/addFaq", async (req, res) => {
  const isAuthenticated = await checkAdminAuth(req);
  if (!isAuthenticated.auth) {
    res
      .clearCookie(process.env.ADMIN_AUTH_TOKEN_NAME)
      .clearCookie("userName")
      .status(401)
      .json({ auth: false });
  } else {
    const faq = req.body;
    let faqRawAnswers = await Promise.all(
      faq.faqAnswer.map(async (answer) => {
        const faqDynamicKeyEncrypted = await Iron.seal(
          { answerFunc: answer.faqDynamicKey },
          process.env.DYNAMIC_ANSWER_SECRET,
          Iron.defaults
        );
        return { ...answer, faqDynamicKey: faqDynamicKeyEncrypted };
      })
    );
    let faqObj = new Faq({
      faqQuestionText: faq.faqQuestionText,
      faqCategoryPath: faq.faqCategoryPath,
      faqAnswer: faqRawAnswers,
    });
    const faqSaved = await faqObj.save();
    if (
      faqSaved.faqCategoryPath[0] === "Orders" &&
      faqSaved.faqCategoryPath[1] !== "General"
    ) {
      let saved = await Order.updateMany(
        { orderStatus: faqSaved.faqCategoryPath[1] },
        { $push: { faqId: faqSaved._id } }
      ).exec();
    } else if (faqSaved.faqCategoryPath[0] === "Products") {
      await Product.updateOne(
        { productName: faqSaved.faqCategoryPath[1] },
        { $push: { faqId: faqSaved._id } }
      ).exec();
    } else if ((faqSaved.faqCategoryPath[0] = "My Account")) {
      await User.updateMany({}, { $push: { faqId: faqSaved._id } }).exec();
    }
    await Category.updateOne(
      {
        categoryName:
          faqSaved.faqCategoryPath[faqSaved.faqCategoryPath.length - 1],
      },
      { $push: { faqId: faqSaved._id } }
    ).exec();
    res.status(201).json({ faqId: faqSaved._id.toString(), auth: true });
  }
});

app.get("/getAllCategoryPaths", async (req, res) => {
  let categoriesGraph = createCategoriesGraph();
  function getAllPaths() {
    let stack = [];
    stack.push(["root", ""]);
    let allCategories = [];

    while (stack.length > 0) {
      let curr = stack.pop();
      if (curr[1]) {
        curr[1] += "->";
      } else {
        curr[1] += "\n";
      }
      curr[1] += curr[0];
      if (
        categoriesGraph[curr[0]] === null ||
        categoriesGraph[curr[0]] === undefined
      ) {
        allCategories.push(curr[1].split("->"));
      }
      if (
        categoriesGraph[curr[0]] !== null &&
        categoriesGraph[curr[0]] !== undefined
      ) {
        for (const child of categoriesGraph[curr[0]]) {
          stack.push([child, curr[1]]);
        }
      }
    }
    for (let categoryPath of allCategories) {
      categoryPath.shift();
    }
    return allCategories;
  }
  res.status(200).json({ allCategoriesPaths: getAllPaths() });
});

// app.delete('/cancelOrder/:orderId',async (req,res)=>{
//     const updateOrdersUserPromise = (userId,orderId) => {
//         return new Promise((resolve,reject)=>{
//             User.updateOne({_id: userId},{$pull: {userOrders: orderId}}).exec().then((res)=>{
//                 resolve({
//                     ...res
//                 })
//             }).catch((err)=>{
//                 reject({
//                     ...err
//                 })
//             })
//         })
//     }
//     try{
//         const orderId = req.params.orderId;
//         const order = await Order.findById(orderId).exec();
//         if(order === null || order === undefined || Object.keys(order).length === 0){
//             res.sendStatus(404);
//         }
//         else if(order.orderStatus === 'Completed'){
//             res.sendStatus(403);
//         }
//         else{
//             if(order.userId.toString() === req.query.user.toString()){
//                 const updateUserOrders = await updateOrdersUserPromise(order.userId,orderId);
//                 let deleteOrder = await Order.deleteOne({_id: orderId}).exec();
//                 res.sendStatus(200);
//             }
//             else{
//                 res.sendStatus(403);
//             }
//         }
//     }
//     catch(err){
//         res.sendStatus(404);
//     }
// });

/**Chatbot Specific Routes */
app.get("/search-on-category", async (req, res) => {
  const categoryName = req.query.categoryName;
  const userId = req.query.user;
  const checkValidCategory =
    categoryName === null || categoryName === undefined
      ? []
      : ["Stocks", "FDs", "Mutual Funds", "Gold"].filter(
          (c) => c.toLowerCase() === categoryName.toString().toLowerCase()
        );
  if (checkValidCategory.length === 0) {
    res.sendStatus(404);
  } else {
    try {
      Faq.find({ faqCategoryPath: categoryName }).exec(function (err, faqDocs) {
        if (
          err ||
          faqDocs === null ||
          faqDocs === undefined ||
          faqDocs.length === 0
        ) {
          res.sendStatus(404);
        } else {
          let faqs = [];
          User.findById(userId)
            .populate("faqs")
            .exec(function (_, userFound) {
              // if(userFound !== null && userFound !==null && Object.keys(userFound.toJSON()).length !== 0 && userFound.userKyc.status !== 'Completed'){
              //     faqs = userFound.faqs.filter((faqDoc)=>(JSON.stringify(faqDoc.faqCategoryPath) === JSON.stringify(['My Account','KYC'])))
              //                         .flatMap((faqDoc)=>{
              //                             const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
              //                                 return {QuestionId: faqDoc._id,QuestionPos: idx,QuestionText: q};
              //                             });
              //                             return faqResponse;
              //                         })
              // }
              faqs = fetchUserKycFaqs(userFound);
              const results = Promise.all(
                faqDocs.map((faqDoc) => {
                  const faqResponse = faqDoc.faqQuestionText.map((q, idx) => {
                    return {
                      QuestionId: faqDoc._id,
                      QuestionPos: idx,
                      QuestionText: q,
                    };
                  });
                  faqs.push(...faqResponse);
                })
              );

              results
                .then((_) => res.status(200).json(faqs))
                .catch((_) => res.sendStatus(404));
            });
        }
      });
    } catch (err) {
      res.sendStatus(404);
    }
  }
});

app.get("/user-specific-order-details", async (req, res) => {
  const userId = req.query.user;
  User.findById(userId)
    .populate("faqs")
    .exec(function (err, userFound) {
      if (
        err ||
        userFound === null ||
        userFound === undefined ||
        Object.keys(userFound.toJSON()).length === 0
      ) {
        res.sendStatus(404);
      } else {
        let faqs = fetchUserKycFaqs(userFound);
        Faq.find({ faqCategoryPath: { $all: ["Orders", "General"] } }).exec(
          function (err, faqsFound) {
            if (
              err ||
              faqsFound === null ||
              faqsFound === undefined ||
              faqsFound.length === 0
            ) {
              res.sendStatus(404);
            } else {
              const results = Promise.all(
                faqsFound.map((faqDoc) => {
                  const faqResponse = faqDoc.faqQuestionText.map((q, idx) => {
                    return {
                      QuestionId: faqDoc._id,
                      QuestionPos: idx,
                      QuestionText: q,
                    };
                  });
                  faqs.push(...faqResponse);
                })
              );

              results
                .then((_) => res.status(200).json(faqs))
                .catch((_) => res.sendStatus(404));
            }
          }
        );
      }
    });
});

app.get("/user-account-questions", async (req, res) => {
  const userId = req.query.user;
  if (userId === null || userId === undefined) {
    res.sendStatus(404);
  } else {
    User.findById(userId)
      .populate("faqs")
      .exec(function (err, userFound) {
        if (
          err ||
          userFound === null ||
          userFound === undefined ||
          Object.keys(userFound.toJSON()).length === 0
        ) {
          res.sendStatus(404);
        } else {
          let faqs = [];
          const results = Promise.all(
            userFound.faqs.map((faqDoc) => {
              const faqResponse = faqDoc.faqQuestionText.map((q, idx) => {
                return {
                  QuestionId: faqDoc._id,
                  QuestionPos: idx,
                  QuestionText: q,
                };
              });
              faqs.push(...faqResponse);
            })
          );

          results
            .then((_) => res.status(200).json(faqs))
            .catch((_) => res.sendStatus(404));
        }
      });
  }
});

app.get("/product-specific-questions", async (req, res) => {
  const userId = req.query.user;
  const productId = req.query.product;
  if (productId === null || productId === undefined) {
    res.sendStatus(404);
  } else {
    Product.findById(productId)
      .populate("faqs")
      .exec(function (err, productFound) {
        if (
          err ||
          productFound === null ||
          productFound === undefined ||
          Object.keys(productFound.toJSON()).length === 0
        ) {
          res.sendStatus(404);
        } else {
          productFound = productFound.toJSON();
          let faqs = [];
          User.findById(userId)
            .populate("faqs")
            .exec(function (err, userFound) {
              if (
                err ||
                userFound === null ||
                userFound === undefined ||
                Object.keys(userFound.toJSON()).length === 0
              ) {
                productFound.faqs = productFound.faqs.filter(
                  (faqDoc) =>
                    faqDoc.faqCategoryPath[
                      faqDoc.faqCategoryPath.length - 1
                    ] ===
                    productFound.productName + " General"
                );
              }
              faqs = fetchUserKycFaqs(userFound);
              const results = Promise.all(
                productFound.faqs.map((faqDoc) => {
                  const faqResponse = faqDoc.faqQuestionText.map((q, idx) => {
                    return {
                      QuestionId: faqDoc._id,
                      QuestionPos: idx,
                      QuestionText: q,
                    };
                  });
                  faqs.push(...faqResponse);
                })
              );

              results
                .then((_) => res.status(200).json(faqs))
                .catch((_) => res.sendStatus(404));
            });
        }
      });
  }
});

app.get("/order-specific-questions", async (req, res) => {
  const userId = req.query.user;
  const orderId = req.query.order;
  if (
    userId === null ||
    orderId === null ||
    userId === undefined ||
    orderId === undefined
  ) {
    res.sendStatus(404);
  } else {
    try {
      User.findOne({
        $and: [
          { _id: userId },
          { userOrders: mongoose.Types.ObjectId(orderId.toString()) },
        ],
      })
        .populate("faqs")
        .exec(function (err, userFound) {
          if (
            err ||
            userFound === null ||
            userFound === undefined ||
            Object.keys(userFound.toJSON()).length === 0
          ) {
            res.sendStatus(404);
          } else {
            Order.findById(orderId)
              .populate("faqs")
              .exec(function (err, orderFound) {
                if (
                  err ||
                  orderFound === null ||
                  orderFound === undefined ||
                  Object.keys(orderFound.toJSON()).length === 0
                ) {
                  res.sendStatus(404);
                } else {
                  let faqs = fetchUserKycFaqs(userFound);
                  // if(userFound.userKyc.status !== 'Completed'){
                  //     faqs = userFound.faqs.filter((faqDoc)=>(JSON.stringify(faqDoc.faqCategoryPath) === JSON.stringify(['My Account','KYC'])))
                  //                 .flatMap((faqDoc)=>{
                  //                     const faqResponse = faqDoc.faqQuestionText.map((q,idx)=>{
                  //                         return {QuestionId: faqDoc._id,QuestionPos: idx,QuestionText: q};
                  //                     });
                  //                     return faqResponse;
                  //                 })
                  // }
                  const results = Promise.all(
                    orderFound.faqs.map((faqDoc) => {
                      const faqResponse = faqDoc.faqQuestionText.map(
                        (q, idx) => {
                          return {
                            QuestionId: faqDoc._id,
                            QuestionPos: idx,
                            QuestionText: q,
                          };
                        }
                      );
                      faqs.push(...faqResponse);
                    })
                  );

                  results
                    .then((_) => res.status(200).json(faqs))
                    .catch((_) => res.sendStatus(404));
                }
              });
          }
        });
    } catch (err) {
      res.sendStatus(404);
    }
  }
});

app.get(
  "/get-answer-by-questionId/:questionId/:questionPos",
  async (req, res) => {
    const questionId = req.params.questionId.toString();
    const questionPos = parseInt(req.params.questionPos);
    const context = req.query;
    if (
      questionId === null ||
      questionId === undefined ||
      questionPos === null ||
      questionPos === undefined
    ) {
      res.sendStatus(404);
    } else {
      try {
        Faq.findById(questionId)
          .select("+faqAnswer.faqDynamicKey")
          .exec(function (err, faqFound) {
            if (
              err ||
              faqFound === null ||
              faqFound === undefined ||
              Object.keys(faqFound.toJSON()).length === 0
            ) {
              res.sendStatus(404);
            } else {
              if (faqFound.faqAnswer[questionPos].faqIsDynamic) {
                Iron.unseal(
                  faqFound.faqAnswer[questionPos].faqDynamicKey,
                  process.env.DYNAMIC_ANSWER_SECRET,
                  Iron.defaults
                )
                  .then((unsealed) => {
                    getAnswerDynamicQuestion(unsealed["answerFunc"], context)
                      .then((answer) => {
                        if (
                          answer === [] ||
                          answer === null ||
                          answer === undefined ||
                          answer.length === 0
                        ) {
                          res
                            .status(404)
                            .json({ Answer: "Unable to fetch anwer!" });
                        } else {
                          res.status(200).json({ Answer: answer });
                        }
                      })
                      .catch((err) =>
                        res.status(err["resCode"]).json({ Answer: err["res"] })
                      );
                  })
                  .catch((err) =>
                    res.status(404).json({ Answer: "Unable to fetch anwer!" })
                  );
              } else {
                res
                  .status(200)
                  .json({
                    Answer: faqFound.faqAnswer[questionPos].faqAnswerText,
                  });
              }
            }
          });
      } catch (err) {
        res.sendStatus(404);
      }
    }
  }
);

app.get("/get-all-categories", async (req, res) => {
  const categoryId = req.query.id;
  const userId = req.query.user;
  let allCategories = [];
  try {
    Category.find({ $or: [{ _id: categoryId }, { categoryName: "root" }] })
      .populate("subCategories")
      .exec(function (err, categories) {
        if (
          err ||
          categories === null ||
          categories === undefined ||
          categories.length === 0
        ) {
          res.sendStatus(404);
        } else if (
          categories.length === 1 &&
          categories[0].categoryName === "root"
        ) {
          User.findById(userId).exec(function (err, userFound) {
            const dontIncludeMyAccountCategory =
              err ||
              userFound === null ||
              userFound === undefined ||
              Object.keys(userFound.toJSON()).length === 0;
            allCategories = categories[0].subCategories
              .filter(
                (sc) =>
                  sc.categoryName !== "Orders" &&
                  sc.categoryName !== "Products" &&
                  (dontIncludeMyAccountCategory === false
                    ? true
                    : sc.categoryName !== "My Account")
              )
              .map((sc) => {
                return {
                  categoryId: sc._id,
                  Name: sc.categoryName,
                  hasSubCategory: sc.hasSubCategory,
                };
              });
            res.status(200).json(allCategories);
          });
        } else {
          const result = Promise.all(
            categories
              .filter((category) => category.categoryName !== "root")
              .map((category) => {
                const answer = category.subCategories.map((sc) => {
                  return {
                    categoryId: sc._id,
                    Name: sc.categoryName,
                    hasSubCategory: sc.hasSubCategory,
                  };
                });
                allCategories.push(...answer);
              })
          );
          result
            .then((_) => res.status(200).json(allCategories))
            .catch((_) => res.sendStatus(404));
        }
      });
  } catch (err) {
    res.sendStatus(404);
  }
});
app.get("/get-question-by-category/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    Category.findById(categoryId)
      .populate("faqs")
      .exec(function (err, categoryFound) {
        if (
          err ||
          categoryFound === null ||
          categoryFound === undefined ||
          Object.keys(categoryFound.toJSON()).length === 0
        ) {
          res.sendStatus(404);
        } else {
          let faqs = [];
          const results = Promise.all(
            categoryFound.faqs.map((faqDoc) => {
              const faqResponse = faqDoc.faqQuestionText
                .filter(
                  (_, idx) => faqDoc.faqAnswer[idx].faqIsDynamic === false
                )
                .map((q, idx) => {
                  return {
                    QuestionId: faqDoc._id,
                    QuestionPos: idx,
                    QuestionText: q,
                  };
                });
              faqs.push(...faqResponse);
            })
          );

          results
            .then((_) => res.status(200).json(faqs))
            .catch((_) => res.sendStatus(404));
        }
      });
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.app = app;
exports.fetchUserKycFaqs = fetchUserKycFaqs;
exports.productResponseMap = productResponseMap;
