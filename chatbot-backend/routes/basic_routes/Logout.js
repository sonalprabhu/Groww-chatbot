const { router } = require("../../api_config/CreateRouter");
const Iron = require("@hapi/iron");

router.get("/logout", async (req, res) => {
  try {
    const userId = req.query.user;
    const unsealed = await Iron.unseal(
      req.cookies[process.env.AUTH_TOKEN_NAME],
      process.env.SESSION_SECRET,
      Iron.defaults
    );
    if (unsealed._id.toString() === userId.toString())
      res
        .status(200)
        .clearCookie(process.env.AUTH_TOKEN_NAME)
        .json({ logout: true });
    else throw new Error("Invalid userId");
  } catch (err) {
    res.status(401).json({ logout: false });
  }
});

exports.router = router;
