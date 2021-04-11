const { router } = require("../../api_config/CreateRouter");
const { User } = require("../../models/user");
const Iron = require("@hapi/iron");

router.get("/checkAuth", async (req, res) => {
  try {
    const sealed = req.cookies[process.env.AUTH_TOKEN_NAME];
    const userId = req.query.user;
    const unsealed = await Iron.unseal(
      sealed,
      process.env.SESSION_SECRET,
      Iron.defaults
    );
    const user = await User.findById(userId).exec();
    res
      .status(user._id.toString() === unsealed._id.toString() ? 200 : 401)
      .json({ auth: true });
  } catch (err) {
    res.status(401).json({ auth: false });
  }
});

exports.router = router;
