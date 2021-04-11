const { router } = require("../../api_config/CreateRouter");
const { Order } = require("../../models/order");
const { productResponseMap } = require("../../api_config/ResponseMapper");

router.get("/getOrderDetails/:orderId", async (req, res) => {
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
      delete order.userId;
      res.status(200).json({ ...order, products }); //need for the filter on the fields to be returned
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
