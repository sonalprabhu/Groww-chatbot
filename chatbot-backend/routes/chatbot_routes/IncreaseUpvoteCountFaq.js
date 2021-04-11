const { router } = require("../../api_config/CreateRouter");
const { Faq } = require("../../models/faqs");

/**
 * @swagger
 * /increaseUpvoteCount/{questionId}/{questionPos}:
 *    patch:
 *      summary: Increase upvote or like value of a particular faq
 *      description: This API is responsible for increasing upvote value on a particular question
 *      tags: [Faqs]
 *      parameters:
 *        - in: path
 *          name: questionId
 *          required: true
 *          schema:
 *            type: string
 *          description: Faq id for which one of the questions has to be upvoted
 *        - in: path
 *          name: questionPos
 *          required: true
 *          schema:
 *            type: integer
 *          description: Index value of the question from the given faq id which has to be upvoted
 *      responses:
 *        204:
 *          description: Successfully updates the upvote value of a question of a faq
 *        404:
 *          description: Unable to update upvote value maybe because of invalid request parameters
 */
router.patch(
  "/increaseUpvoteCount/:questionId/:questionPos",
  async (req, res) => {
    const faqId = req.params.questionId.toString();
    const faqPos = parseInt(req.params.questionPos);
    try {
      const faqDoc = await Faq.findByIdAndUpdate(
        faqId,
        { $inc: { [`faqQuestionAnswer.${faqPos}.faqUpvoteCount`]: 1 } },
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
