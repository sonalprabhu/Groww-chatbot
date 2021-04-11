const { router } = require("../../api_config/CreateRouter");
const { Product } = require("../../models/product");
const { productResponseMap } = require("../../api_config/ResponseMapper");

router.get("/getProductDetails/:productId", async (req, res) => {
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

exports.router = router;
