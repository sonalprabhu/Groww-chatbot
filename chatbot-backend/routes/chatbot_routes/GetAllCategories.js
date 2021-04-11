const { router } = require("../../api_config/CreateRouter");
const { User } = require("../../models/user");
const { Category } = require("../../models/category");


/**
 * @swagger
 * /get-all-categories:
 *    get:
 *      summary: Shows all explore categories if no category is given based on user context otherwise gives child categories if proper category id is given
 *      description: This API fetches categories for a particular parent category and if no category id is supplied returns the principal explore categories (Stocks,Mutual Funds,Gold,FDs and My Account(if user id is available))
 *      tags: [Faqs]
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: string
 *          description: category id for which child categories have to be fetched.If not given root category's explore sub categories are fetched.
 *        - in: query
 *          name: user
 *          schema:
 *            type: string
 *          description: user id.If given fetches My Account category if no parent id is given along with other categories.
 *      responses:
 *        200:
 *          description:  List of sub category names according to the request query values.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  required:
 *                    - categoryId
 *                    - Name
 *                    - hasSubCategory
 *                  properties:
 *                    categoryId:
 *                      type: string
 *                      descripion: The unique id of the category object
 *                    Name:
 *                      type: string
 *                      description: Category name
 *                    hasSubCategory:
 *                      type: boolean
 *                      description: Flag value which states whether a category returned has more child categories or not
 *        404:
 *          description: Requested list cannot be found
 */
router.get("/get-all-categories", async (req, res) => {
  const categoryId = req.query.id;
  const userId = req.query.user;
  let allCategories = [];
  try {
    Category.find({ $or: [{ _id: categoryId }, { categoryName: "root" }] })
      .populate("subCategories")
      .exec(function (err, categories) {
        if (
          err ||
          categories === null ||
          categories === undefined ||
          categories.length === 0
        ) {
          res.sendStatus(404);
        } else if (
          categories.length === 1 &&
          categories[0].categoryName === "root"
        ) {
          User.findById(userId).exec(function (err, userFound) {
            const dontIncludeMyAccountCategory =
              err ||
              userFound === null ||
              userFound === undefined ||
              Object.keys(userFound.toJSON()).length === 0;
            allCategories = categories[0].subCategories
              .filter(
                (sc) =>
                  sc.categoryName !== "Orders" &&
                  sc.categoryName !== "Products" &&
                  (dontIncludeMyAccountCategory === false
                    ? true
                    : sc.categoryName !== "My Account")
              )
              .map((sc) => {
                return {
                  categoryId: sc._id,
                  Name: sc.categoryName,
                  hasSubCategory: sc.hasSubCategory,
                };
              });
            res.status(200).json(allCategories);
          });
        } else {
          const result = Promise.all(
            categories
              .filter((category) => category.categoryName !== "root")
              .map((category) => {
                const answer = category.subCategories.map((sc) => {
                  return {
                    categoryId: sc._id,
                    Name: sc.categoryName,
                    hasSubCategory: sc.hasSubCategory,
                  };
                });
                allCategories.push(...answer);
              })
          );
          result
            .then((_) => res.status(200).json(allCategories))
            .catch((_) => res.sendStatus(404));
        }
      });
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
