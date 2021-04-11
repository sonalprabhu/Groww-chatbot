const { router } = require("../../api_config/CreateRouter");
const { User } = require("../../models/user");

router.get("/getUserDetails/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).exec();
    res.status(200).json({
      userName: user.userName,
      userDOB: user.userDOB,
      userMob: user.userMob,
      userMaritalStatus: user.userMaritalStatus,
      userGender: user.userGender,
      userOrderPlacedToday: user.userOrderPlacedToday,
    });
  } catch (err) {
    res.sendStatus(404);
  }
});

exports.router = router;
