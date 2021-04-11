const { router } = require("../../api_config/CreateRouter");
const {
  getFaqsFromCategory,
  fetchUserKycFaqs,
} = require("../../api_config/ResponseMapper");
const { User } = require("../../models/user");
const { Category } = require("../../models/category");

/**
 * @swagger
 * /user-specific-order-details:
 *    get:
 *      summary: List of order general faqs is user context is correct
 *      description: This API fetches order general based questions if user is valid and the page context is at orders general page
 *      tags: [Faqs]
 *      parameters:
 *        - in: query
 *          name: user
 *          required: true
 *          schema:
 *            type: string
 *          description: Unique id of the user for which orders general faq list has to be displayed
 *      responses:
 *        200:
 *          description: Successfully fetches the faq list for Orders general
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/FaqResponse'
 *        404:
 *          description: Faq list cannot be fetched
 */
router.get("/user-specific-order-details", async (req, res) => {
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
    const orderGeneralCategory = await Category.findOne({
      categoryName: "General",
    }).exec();
    const response = (await fetchUserKycFaqs(userDoc)).concat(
      await getFaqsFromCategory(orderGeneralCategory)
    );
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
