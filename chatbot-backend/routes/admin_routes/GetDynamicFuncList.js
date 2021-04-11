const { router } = require("../../api_config/CreateRouter");
const { checkAdminAuth } = require("../../api_config/CheckAuthAdmin");
const {
  dynamicQuestions,
} = require("../../api_config/dynamic_questions_handler");

router.get("/getDynamicFuncs", async (req, res) => {
  const isAuthenticated = await checkAdminAuth(req);
  if (!isAuthenticated.auth) {
    res
      .clearCookie(process.env.ADMIN_AUTH_TOKEN_NAME)
      .clearCookie("userName")
      .status(401)
      .json({ auth: false });
  } else {
    const dynamicFuncList = Object.keys(dynamicQuestions);
    res.status(200).json({ dynamicFuncList });
  }
});

exports.router = router;
