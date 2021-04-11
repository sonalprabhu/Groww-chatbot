const { router } = require("../../api_config/CreateRouter");
const {
  getFaqsFromCategory,
  fetchUserKycFaqs,
} = require("../../api_config/ResponseMapper");
const { User } = require("../../models/user");
const { Product } = require("../../models/product");
const { Category } = require("../../models/category");

/**
 * @swagger
 * /product-specific-questions:
 *    get:
 *      summary: Fetches the faq list belonging to a specific product
 *      description: This API fetches faq list belonging to a specific product depending upon context (userId if not given then only generic questions are provided)
 *      tags: [Faqs]
 *      parameters:
 *        - in: query
 *          name: user
 *          schema:
 *            type: string
 *          description: Unique id of the user
 *        - in: query
 *          name: product
 *          required: true
 *          schema:
 *            type: string
 *          description: Unique id of the product for which faqs has to be fetched
 *      responses:
 *        200:
 *          description: Successfully fetches faq list based on context for a particular product
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/FaqResponse'
 *        404:
 *          description: Faq list cannot be generated
 *          
 */
router.get("/product-specific-questions", async (req, res) => {
  const userId = req.query.user;
  const productId = req.query.product;
  try {
    const productDoc = await Product.findById(productId).exec();
    if (
      productDoc === null ||
      productDoc === undefined ||
      Object.keys(productDoc.toJSON()).length === 0
    ) {
      throw new Error("Invalid product details");
    }
    const userDoc = await User.findById(userId).exec();
    if (
      userDoc === null ||
      userDoc === undefined ||
      Object.keys(userDoc.toJSON()).length === 0
    ) {
      const productGeneralCategory = await Category.findOne({
        categoryName: productDoc.productName + " General",
      }).exec();
      res.status(200).json(await getFaqsFromCategory(productGeneralCategory));
    } else {
      const productCategory = await Category.findOne({
        categoryName: productDoc.productName,
      }).exec();
      const response = (await fetchUserKycFaqs(userDoc)).concat(
        await getFaqsFromCategory(productCategory)
      );
      res.status(200).json(response);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
