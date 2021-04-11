const { router } = require("../../api_config/CreateRouter");
const { getAnswerDynamicQuestion } = require("../../api_config/dynamic_answer_mapper");
const { Faq } = require("../../models/faqs");
const Iron = require("@hapi/iron");

/**
 * @swagger
 * /get-answer-by-questionId/{questionId}/{questionPos}:
 *    get:
 *      summary: Fetches answer array for a given faq id and context object(for dynamic answers)
 *      description: This API fetches the answer array based on faq id supplied along with context object responsible for dynamic answer rendering
 *      tags: [Faqs]
 *      parameters:
 *        - in: path
 *          name: questionId
 *          required: true
 *          schema:
 *            type: string
 *          description: faq id for which anser array has to be generated
 *        - in: path
 *          name: questionPos
 *          required: true
 *          schema:
 *            type: integer
 *          description: index of the question in the faq object whose id is equal to questionId supplied
 *        - in: query
 *          name: context
 *          schema:
 *            type: object
 *            properties:
 *              user:
 *                type: string
 *                description: user id of the signed in user
 *              product:
 *                type: string
 *                description: product id of the product if user has product on current page context
 *              order:
 *                type: string
 *                description: order id of the order if user has order information on current page context
 *            example:
 *              user: 6071c3656ee30e0888ce4103
 *              product: 6071c3666ee30e0888ce4109
 *              order: 6071c3676ee30e0888ce4138
 *          description: context object required for dynamic answers if available 
 *      responses:
 *        200:
 *          description: Answer array of the asked faq
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  required:
 *                    - Answer
 *                  properties:
 *                    Answer:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/FaqAnswer'
 *        404:
 *          description: Answer array cannot be found
 *          
 */
router.get("/get-answer-by-questionId/:questionId/:questionPos",async (req, res) => {
    const questionId = req.params.questionId.toString();
    const questionPos = parseInt(req.params.questionPos);
    const context = req.query;
    if (
      questionId === null ||
      questionId === undefined ||
      questionPos === null ||
      questionPos === undefined
    ) {
      res.sendStatus(404);
    } else {
      try {
        Faq.findById(questionId)
          .select("+faqQuestionAnswer.faqDynamicKey")
          .lean()
          .exec(function (err, faqFound) {
            if (
              err ||
              faqFound === null ||
              faqFound === undefined ||
              Object.keys(faqFound).length === 0
            ) {
              res.sendStatus(404);
            } else {
              if (faqFound.faqQuestionAnswer[questionPos].faqIsDynamic) {
                Iron.unseal(
                  faqFound.faqQuestionAnswer[questionPos].faqDynamicKey,
                  process.env.DYNAMIC_ANSWER_SECRET,
                  Iron.defaults
                )
                  .then((unsealed) => {
                    getAnswerDynamicQuestion(unsealed["answerFunc"], context)
                      .then((answer) => {
                        if (
                          answer === [] ||
                          answer === null ||
                          answer === undefined ||
                          answer.length === 0
                        ) {
                          res
                            .status(404)
                            .json({ Answer: [{faqAnswerText: "Unable to fetch anwer!",faqAnswerType: "text"}]});
                        } else {
                          res.status(200).json({ Answer: answer });
                        }
                      })
                      .catch((err) =>
                        res.status(err["resCode"]).json({ Answer: err["res"] })
                      );
                  })
                  .catch((err) =>
                    res.status(404).json({ Answer: [{faqAnswerText: "Unable to fetch anwer!",faqAnswerType: "text"}]})
                  );
              } else {
                res
                  .status(200)
                  .json({
                    Answer: faqFound.faqQuestionAnswer[questionPos].faqAnswer,
                  });
              }
            }
          });
      } catch (err) {
        res.sendStatus(404);
      }
    }
  }
);

exports.router = router;
