const { router } = require("../../api_config/CreateRouter");
const { Order } = require("../../models/order");
const { User } = require("../../models/user");

router.patch("/confirmOrder", async (req, res) => {
  const updateOrderPromise = (orderDetails) => {
    return new Promise((resolve, reject) => {
      Order.updateOne(
        { _id: orderDetails.orderId },
        {
          $set: {
            orderStatus: "Completed",
            orderDate: orderDetails.orderDate,
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
      await updateOrderPromise(orderDetails);
      res.sendStatus(204);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
