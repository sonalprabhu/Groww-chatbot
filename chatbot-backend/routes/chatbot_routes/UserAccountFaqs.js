const { router } = require("../../api_config/CreateRouter");
const { getFaqsFromCategory } = require("../../api_config/ResponseMapper");
const { User } = require("../../models/user");
const { Category } = require("../../models/category");

/**
 * @swagger
 * /user-account-questions:
 *    get:
 *      summary: Fetches account related faqs for a particular user
 *      description: This API fetches all My Acccount faqs for a particular user
 *      tags: [Faqs]
 *      parameters:
 *        - in: query
 *          name: user
 *          required: true
 *          schema:
 *            type: string
 *          description: Unique id of the user for which account related faqs have to be fetched
 *      responses:
 *        200:
 *          description: Successfully fetches the list of faqs for my account category
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/FaqResponse'
 *        404:
 *          description: Faq list cannot be fetched 
 */
router.get("/user-account-questions", async (req, res) => {
  const userId = req.query.user;
  try {
    const userDoc = await User.findById(userId).exec();
    if (
      userDoc === null ||
      userDoc === undefined ||
      Object.keys(userDoc.toJSON()).length === 0
    ) {
      throw new Error("Invalid user details");
    }
    const myAccountCategory = await Category.findOne({
      categoryName: "My Account",
    }).exec();
    res.status(200).json(await getFaqsFromCategory(myAccountCategory));
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
