const { router } = require("../../api_config/CreateRouter");
const { checkAdminAuth } = require("../../api_config/CheckAuthAdmin");

router.get("/logoutAdmin", async (req, res) => {
  try {
    const isAuthenticated = await checkAdminAuth(req);
    if (!isAuthenticated.auth) {
      res
        .clearCookie(process.env.ADMIN_AUTH_TOKEN_NAME)
        .clearCookie("userName")
        .status(401)
        .json({ auth: false });
    } else {
      res
        .status(200)
        .clearCookie(process.env.ADMIN_AUTH_TOKEN_NAME)
        .clearCookie("userName")
        .json({ logout: true });
    }
  } catch (err) {
    res.status(404).json({ logout: false });
  }
});

exports.router = router;
