const { router } = require("../../api_config/CreateRouter");
const { User } = require("../../models/user");

/**
 * @swagger
 * /getMaxOrderLimit:
 *    get:
 *      summary: Fetches the max order per day limit of a particular user
 *      description: This API fetches the maximum order per day count being provided for a particular valid user
 *      tags: [Faqs]
 *      parameters:
 *        - in: query
 *          name: user
 *          required: true
 *          schema:
 *            type: string
 *          description: Unique id of the user for which max order per day limit value has to be fetched
 *      responses:
 *        200:
 *          description: Successful fetch of max order per day count
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - maxOrderCount
 *                properties:
 *                  maxOrderCount:
 *                    type: integer
 *                    description: max order per day count
 *        404:
 *          description: Cannot find max order per day count possibly because of invalid user id
 *                  
 */
router.get("/getMaxOrderLimit", async (req, res) => {
  try {
    const userId = req.query.user;
    if (userId === null || userId === undefined) {
      throw new Error("Malformed userId input");
    }
    const userDoc = await User.findById(userId).exec();
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
