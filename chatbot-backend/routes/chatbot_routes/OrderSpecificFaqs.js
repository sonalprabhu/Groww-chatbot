const { router } = require("../../api_config/CreateRouter");
const mongoose = require("mongoose");
const {
  getFaqsFromCategory,
  fetchUserKycFaqs,
} = require("../../api_config/ResponseMapper");
const { User } = require("../../models/user");
const { Order } = require("../../models/order");
const { Category } = require("../../models/category");

/**
 * @swagger
 * /order-specific-questions:
 *    get:
 *      summary: Fetches faqs pertaining to the current status of an order object
 *      description: This API is responsible for getting faqs according to the current status of an order object
 *      tags: [Faqs]
 *      parameters:
 *        - in: query
 *          name: user
 *          required: true
 *          schema:
 *            type: string
 *          description: Unique id of the user of whose order based faqs has to be fetched
 *        - in: query
 *          name: order
 *          required: true
 *          schema:
 *            type: string
 *          description: Unique id of the order of whose faqs has to be fetched based on its current status
 *      responses:
 *        200:
 *          description: Successfully fetches the requested list of faqs
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/FaqResponse'
 *        404:
 *          description: List of faqs cannot be fetched
 */
router.get("/order-specific-questions", async (req, res) => {
  const userId = req.query.user;
  const orderId = req.query.order;
  try {
    const userDoc = await User.findOne({
      $and: [
        { _id: userId },
        { userOrders: mongoose.Types.ObjectId(orderId.toString()) },
      ],
    }).exec();
    if (
      userDoc === null ||
      userDoc === undefined ||
      Object.keys(userDoc.toJSON()).length === 0
    ) {
      throw new Error("Invalid user details or orderId not in userId");
    }
    const orderDoc = await Order.findById(orderId).exec();
    if (
      orderDoc === null ||
      orderDoc === undefined ||
      Object.keys(orderDoc.toJSON()).length === 0
    ) {
      throw new Error("Inavlid order details");
    }
    const orderStatusCategory = await Category.findOne({
      categoryName: orderDoc.orderStatus,
    }).exec();
    const response = (await fetchUserKycFaqs(userDoc)).concat(
      await getFaqsFromCategory(orderStatusCategory)
    );
    res.status(200).json(response);
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
