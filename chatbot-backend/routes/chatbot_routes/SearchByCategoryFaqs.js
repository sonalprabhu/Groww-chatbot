const { router } = require("../../api_config/CreateRouter");
const {
  getFaqsFromCategory,
  fetchUserKycFaqs,
} = require("../../api_config/ResponseMapper");
const { User } = require("../../models/user");
const { Category } = require("../../models/category");

/**
 * @swagger
 * /search-on-category:
 *    get:
 *      summary: Shows faqs based on explore category (Stocks,Mutual Funds,Gold,FDs)
 *      description: This API fetched faqs based on categories when context resides in explore of Groww website
 *      tags: [Faqs]
 *      parameters:
 *        - in: query
 *          name: categoryName
 *          schema:
 *            type: string
 *            required: true
 *          description: category name for which faqs have to be fetched
 *        - in: query
 *          name: user
 *          schema:
 *            type: string
 *          description: user context if provided fetched kyc faqs if kyc of the user is not completed and if provided it should be valid
 *      responses:
 *        200:
 *          description: List of faqs belonging to a specific category
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/FaqResponse'
 *        404:
 *          description: Requested faq set was not because of invalid user details or invalid category name
 */

router.get("/search-on-category", async (req, res) => {
  const categoryName = req.query.categoryName;
  const userId = req.query.user;
  try {
    const validCategories = ["Stocks", "FDs", "Mutual Funds", "Gold"];
    const checkValidCategory = validCategories.filter(
      (c) => c.toLowerCase() === categoryName.toString().toLowerCase()
    );
    if (checkValidCategory.length === 0) {
      throw new Error("Invalid category name");
    }
    const categoryDoc = await Category.findOne({
      categoryName: categoryName.toString(),
    }).exec();
    const userDoc = await User.findById(userId).exec();
    if (
      userDoc === null ||
      userDoc === undefined ||
      Object.keys(userDoc.toJSON()).length === 0
    ) {
      res.status(200).json(await getFaqsFromCategory(categoryDoc));
    } else {
      const response = (await fetchUserKycFaqs(userDoc)).concat(
        await getFaqsFromCategory(categoryDoc)
      );
      res.status(200).json(response);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
