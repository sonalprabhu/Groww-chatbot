const { router } = require("../../api_config/CreateRouter");
const { Order } = require("../../models/order");
const { productResponseMap } = require("../../api_config/ResponseMapper");

router.get("/getAllOrders", async (req, res) => {
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

exports.router = router;
