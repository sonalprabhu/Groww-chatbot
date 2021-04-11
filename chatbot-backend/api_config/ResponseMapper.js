const {Category} = require("../models/category");

//Utility function for fetching all faqs under a category and returning them based on upvote and downvote count
async function getFaqsFromCategory(categoryDoc) {
  categoryDoc = await Category.populate(categoryDoc, { path: "subCategories" });
  let queue = [categoryDoc];
  let faqs = [];
  while (queue.length !== 0) {
    let s = queue.shift();
    if (!s.hasSubCategory) {
      s = await Category.populate(s, { path: "faqs" });
      for (const faqDoc of s.faqs) {
        faqs.push(faqDoc);
      }
    } else {
      let subCategoriesDocs = s.subCategories;
      for (const subCategoryDoc of subCategoriesDocs) {
        queue.push(subCategoryDoc);
      }
    }
  }
  faqs = faqs.flatMap((faqDoc) => {
    const faqResponse = faqDoc.faqQuestionAnswer.map((q, idx) => {
      return {
        QuestionId: faqDoc._id.toString(),
        QuestionPos: idx,
        QuestionText: q.faqQuestion,
        faqUpvoteCount: q.faqUpvoteCount,
        faqDownvoteCount: q.faqDownvoteCount,
      };
    });
    return faqResponse;
  });
  faqs.sort((a, b) => {
    if (b.faqUpvoteCount - a.faqUpvoteCount > 0) {
      return 1;
    } else if (b.faqUpvoteCount - a.faqUpvoteCount < 0) {
      return -1;
    } else {
      return a.faqDownvoteCount - b.faqDownvoteCount;
    }
  });
  faqs = faqs.map((q) => {
    delete q.faqUpvoteCount;
    delete q.faqDownvoteCount;
    return q;
  });
  return faqs;
}

//Utility function for fetching Kyc faqs for those users specifically whose kyc is still not complete
async function fetchUserKycFaqs(userFound) {
  if (
    userFound !== null &&
    userFound !== undefined &&
    Object.keys(userFound.toJSON()).length !== 0 &&
    userFound.userKyc.status !== "Completed"
  ) {
    const kycCategory = await Category.findOne({ categoryName: "KYC" }).exec();
    return await getFaqsFromCategory(kycCategory);
  }
  return [];
}

//Removes unwanted fields from products array or object and sends relevant information for a product
function productResponseMap(products, category) {
  let filteredProducts = products instanceof Array ? [] : {};
  switch (category) {
    case "Stocks":
      {
        if (products instanceof Array) {
          filteredProducts = products.map((p) => {
            const { productPrice, ...fp } = p;
            const { _id, ...productPriceExceptId } = p.productPrice.stockPrice;
            return {
              ...fp,
              _id: fp._id.toString(),
              productPrice: { stockPrice: productPriceExceptId },
            };
          });
        } else {
          const { productPrice, ...fp } = products;
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
            const { productPrice, ...fp } = p;
            const { _id, ...productPriceExceptId } = p.productPrice.fundReturns;
            return {
              ...fp,
              _id: fp._id.toString(),
              productPrice: { fundReturns: productPriceExceptId },
            };
          });
        } else {
          const { productPrice, ...fp } = products;
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
            const { productPrice, ...fp } = p;
            const { _id, ...productPriceExceptId } = p.productPrice.fd;
            return {
              ...fp,
              _id: fp._id.toString(),
              productPrice: { fd: productPriceExceptId },
            };
          });
        } else {
          const { productPrice, ...fp } = products;
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
            const { productPrice, ...fp } = p;
            return {
              ...fp,
              _id: fp._id.toString(),
              productPrice: { purity: p.productPrice.purity },
            };
          });
        } else {
          const { productPrice, ...fp } = products;
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
exports.getFaqsFromCategory = getFaqsFromCategory;
exports.fetchUserKycFaqs = fetchUserKycFaqs;
exports.productResponseMap = productResponseMap;