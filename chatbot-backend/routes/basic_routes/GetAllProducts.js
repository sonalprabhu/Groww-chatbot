const { router } = require("../../api_config/CreateRouter");
const { Product } = require("../../models/product");
const { productResponseMap } = require("../../api_config/ResponseMapper");

router.get("/getAllProducts", async (req, res) => {
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

exports.router = router;
