const { router } = require("../../api_config/CreateRouter");
const bcrypt = require("bcrypt");
const Iron = require("@hapi/iron");
const { Admin } = require("../../models/admin");

router.get("/loginAdmin", async (req, res) => {
  const { userName, userPass } = req.query;
  try {
    const admin = await Admin.findOne({ userName }).exec();
    const isPassMatched = await bcrypt.compare(userPass, admin.userPass);
    if (isPassMatched) {
      const token = await Iron.seal(
        admin,
        process.env.ADMIN_SESSION_SECRET,
        Iron.defaults
      );
      res
        .cookie(process.env.ADMIN_AUTH_TOKEN_NAME, token, {
          expires: new Date(Date.now() + 60 * 60 * 1000), //available only for 60 minutes
          sameSite: "lax",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
        .cookie("userName", admin.userName, {
          expires: new Date(Date.now() + 30 * 60 * 1000), //available only for 30 minutes
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
        })
        .sendStatus(200);
    } else {
      throw new Error("User credentials are not valid");
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
