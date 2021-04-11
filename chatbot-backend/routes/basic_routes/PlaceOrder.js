const { router } = require("../../api_config/CreateRouter");
const { User } = require("../../models/user");
const { Order } = require("../../models/order");

router.post("/placeOrder", async (req, res) => {
  //orderStatus will be in pending state

  const updateUserPromise = (userId, orderId) => {
    return new Promise((resolve, reject) => {
      User.updateOne(
        { _id: userId },
        { $push: { userOrders: orderId }, $inc: { userOrderPlacedToday: 1 } }
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
    if (user === null || user === undefined || Object.keys(user) === 0) {
      res.sendStatus(404);
    } else {
      const orderFromFrontend = req.body;
      const newOrder = new Order({
        //max_units_per_order should be managed from frontend
        orderStatus: "Pending",
        userId,
        ...orderFromFrontend,
      });
      const newOrderDoc = await newOrder.save();
      await updateUserPromise(userId, newOrderDoc._id);
      res.status(201).json({ orderId: newOrderDoc._id.toString() });
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
