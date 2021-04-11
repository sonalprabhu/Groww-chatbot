const { router } = require("../../api_config/CreateRouter");
const { Category } = require("../../models/category");

/**
 * @swagger
 * /get-question-by-category/{categoryId}:
 *    get:
 *      summary: Shows the list of faqs (static) which belongs to a particular leaf node category id
 *      description: This API fetches the list of all static answer faqs which belongs to a particular leaf node category id
 *      tags: [Faqs]
 *      parameters:
 *        - in: path
 *          name: categoryId
 *          required: true
 *          schema:
 *            type: string
 *          description: category id (must be leaf node) for which faqs have to be fetched
 *      responses:
 *        200:
 *          description: List of all faqs generated
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/FaqResponse'
 *        404:
 *          description: List of faqs cannot be fetched maybe because of invalid category id or category id is not a leaf node in category tree
 *      
 */
router.get("/get-question-by-category/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    Category.findById(categoryId)
      .populate("faqs")
      .exec(function (err, categoryFound) {
        if (
          err ||
          categoryFound === null ||
          categoryFound === undefined ||
          Object.keys(categoryFound.toJSON()).length === 0
        ) {
          res.sendStatus(404);
        } else {
          let faqs = [];
          const results = Promise.all(
            categoryFound.faqs.map((faqDoc) => {
              const faqResponse = faqDoc.faqQuestionAnswer
                .filter((q) => q.faqIsDynamic === false)
                .map((q, idx) => {
                  return {
                    QuestionId: faqDoc._id,
                    QuestionPos: idx,
                    QuestionText: q.faqQuestion,
                    faqUpvoteCount: q.faqUpvoteCount,
                    faqDownvoteCount: q.faqDownvoteCount,
                  };
                });
              faqs.push(...faqResponse);
            })
          );

          results
            .then((_) => {
              faqs = faqs
                .sort((a, b) => {
                  if (b.faqUpvoteCount - a.faqUpvoteCount > 0) {
                    return 1;
                  } else if (b.faqUpvoteCount - a.faqUpvoteCount < 0) {
                    return -1;
                  } else {
                    return a.faqDownvoteCount - b.faqDownvoteCount;
                  }
                })
                .map((q) => {
                  delete q.faqUpvoteCount;
                  delete q.faqDownvoteCount;
                  return q;
                });
              res.status(200).json(faqs);
            })
            .catch((_) => res.sendStatus(404));
        }
      });
  } catch (err) {
    res.sendStatus(404);
  }
});
exports.router = router;
