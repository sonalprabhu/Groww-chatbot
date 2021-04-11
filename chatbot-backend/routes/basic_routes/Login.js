const { router } = require("../../api_config/CreateRouter");
const { User } = require("../../models/user");
const Iron = require("@hapi/iron");
const bcrypt = require("bcrypt");

router.get("/login", async (req, res) => {
  User.findOne({ userName: req.query.userName })
    .select("+userPass")
    .exec(function (err, userFound) {
      if (
        err ||
        userFound === null ||
        userFound === undefined ||
        Object.keys(userFound.toJSON()).length === 0
      ) {
        res.sendStatus(404);
      } else {
        bcrypt.compare(
          req.query.userPass,
          userFound.userPass,
          function (err, result) {
            if (err || result === false) {
              res.sendStatus(404);
            } else {
              Iron.seal(userFound, process.env.SESSION_SECRET, Iron.defaults)
                .then((sealed) => {
                  res
                    .status(200)
                    .cookie(process.env.AUTH_TOKEN_NAME, sealed, {
                      expires: new Date(Date.now() + 900000), //available only for 15 minutes
                      sameSite: "lax",
                      httpOnly: true,
                      secure: process.env.NODE_ENV === "production",
                      path: "/",
                    })
                    .json({
                      userId: userFound._id,
                      userName: userFound.userName,
                    });
                })
                .catch((_) => res.sendStatus(404));
            }
          }
        );
      }
    });
});

exports.router = router;
