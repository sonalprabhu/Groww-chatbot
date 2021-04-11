const { router } = require("../../api_config/CreateRouter");
const { User } = require("../../models/user");

/**
 * @swagger
 * /setMaxOrderLimit:
 *    patch:
 *      summary: Updates the max order per day count of a user
 *      description: This API updates the max order limit of a user
 *      tags: [Faqs]
 *      parameters:
 *        - in: query
 *          name: user
 *          required: true
 *          schema:
 *            type: string
 *          description: Unique id of a user
 *        - in: query
 *          name: maxOrderCount
 *          required: true
 *          schema:
 *            type: integer
 *          description: Value for max order count which needs to be placed in current value in user object
 *      responses:
 *        200:
 *          description: Successfully updates the max order count value of a user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - maxOrderCount
 *                properties:
 *                  maxOrderCount:
 *                    type: integer
 *                    description: The new value of the maxOrderCount after successful update
 *        404:
 *          description: Unable to update the maxOrderCount of the given user id
 */
router.patch("/setMaxOrderLimit", async (req, res) => {
  try {
    const maxOrderCount = parseInt(req.query.maxOrderCount);
    const userId = req.query.user;
    if (
      maxOrderCount === null ||
      maxOrderCount === undefined ||
      userId === null ||
      userId === undefined
    ) {
      throw new Error("Invalid maxOrderCount");
    }
    const userDoc = await User.findByIdAndUpdate(
      userId,
      { $set: { userMaxOrdersPerDay: maxOrderCount } },
      { new: true }
    ).exec();
    if (
      userDoc === null ||
      userDoc === undefined ||
      Object.keys(userDoc.toJSON()).length === 0
    ) {
      throw new Error("Invalid user details");
    }
    res
      .status(200)
      .json({ maxOrderCount: parseInt(userDoc.userMaxOrdersPerDay) });
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
