const { router } = require("../../api_config/CreateRouter");
const { checkAdminAuth } = require("../../api_config/CheckAuthAdmin");
const { createCategoriesGraph } = require("../../mock_data/categoriesGraph");

function getAllPaths(categoriesGraph) {
  let stack = [];
  stack.push(["root", ""]);
  let allCategories = [];

  while (stack.length > 0) {
    let curr = stack.pop();
    if (curr[1]) {
      curr[1] += "->";
    } else {
      curr[1] += "\n";
    }
    curr[1] += curr[0];
    if (
      categoriesGraph[curr[0]] === null ||
      categoriesGraph[curr[0]] === undefined
    ) {
      allCategories.push(curr[1].split("->"));
    }
    if (
      categoriesGraph[curr[0]] !== null &&
      categoriesGraph[curr[0]] !== undefined
    ) {
      for (const child of categoriesGraph[curr[0]]) {
        stack.push([child, curr[1]]);
      }
    }
  }
  for (let categoryPath of allCategories) {
    categoryPath.shift();
  }
  return allCategories;
}

router.get("/getAllCategoryPaths", async (req, res) => {
  const isAuthenticated = await checkAdminAuth(req);
  if (!isAuthenticated.auth) {
    res
      .clearCookie(process.env.ADMIN_AUTH_TOKEN_NAME)
      .clearCookie("userName")
      .status(401)
      .json({ auth: false });
  } else {
    let categoriesGraph = createCategoriesGraph();
    res.status(200).json({ allCategoriesPaths: getAllPaths(categoriesGraph) });
  }
});
exports.router = router;
