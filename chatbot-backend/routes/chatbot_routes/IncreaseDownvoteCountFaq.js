const { router } = require("../../api_config/CreateRouter");
const { Faq } = require("../../models/faqs");

/**
 * @swagger
 * /increaseDownvoteCount/{questionId}/{questionPos}:
 *    patch:
 *      summary: Increase downvote or dislike value of a particular faq
 *      description: This API is responsible for increasing downvote value on a particular question
 *      tags: [Faqs]
 *      parameters:
 *        - in: path
 *          name: questionId
 *          required: true
 *          schema:
 *            type: string
 *          description: Faq id for which one of the questions has to be downvoted
 *        - in: path
 *          name: questionPos
 *          required: true
 *          schema:
 *            type: integer
 *          description: Index value of the question from the given faq id which has to be downvoted
 *      responses:
 *        204:
 *          description: Successfully updates the downvote value of a question of a faq
 *        404:
 *          description: Unable to update downvote value maybe because of invalid request parameters
 */
router.patch(
  "/increaseDownvoteCount/:questionId/:questionPos",
  async (req, res) => {
    const faqId = req.params.questionId.toString();
    const faqPos = parseInt(req.params.questionPos);
    try {
      const faqDoc = await Faq.findByIdAndUpdate(
        faqId,
        { $inc: { [`faqQuestionAnswer.${faqPos}.faqDownvoteCount`]: 1 } },
        { new: true }
      ).exec();
      if (
        faqDoc === null ||
        faqDoc === undefined ||
        Object.keys(faqDoc.toJSON()).length === 0
      ) {
        throw new Error("Invalid faq details");
      }
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(404);
    }
  }
);

exports.router = router;
