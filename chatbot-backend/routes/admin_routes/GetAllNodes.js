const { router } = require("../../api_config/CreateRouter");
const { Category } = require("../../models/category");
const { checkAdminAuth } = require("../../api_config/CheckAuthAdmin");

router.get("/getAllNodes", async (req, res) => {
  try {
    const isAuthenticated = await checkAdminAuth(req);
    if (!isAuthenticated.auth) {
      res
        .clearCookie(process.env.ADMIN_AUTH_TOKEN_NAME)
        .clearCookie("userName")
        .status(401)
        .json({ auth: false });
    } else {
      let allCategories = await Category.find({}).exec();
      allCategories = allCategories.map((c) => c.categoryName);
      res.status(200).json({ nodes: allCategories });
    }
  } catch (err) {
    res.status(404).json({ nodes: [] });
  }
});

exports.router = router;
