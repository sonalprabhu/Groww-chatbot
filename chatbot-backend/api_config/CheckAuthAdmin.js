const Iron = require("@hapi/iron");
const { Admin } = require("../models/admin");

//For verifying if the admin is still logged in or not
const checkAdminAuth = async (req) => {
  try {
    const sealed = req.cookies[process.env.ADMIN_AUTH_TOKEN_NAME];
    const userName = req.cookies["userName"];
    const unsealed = await Iron.unseal(
      sealed,
      process.env.ADMIN_SESSION_SECRET,
      Iron.defaults
    );
    const user = await Admin.findOne({ userName }).exec(); //can be removed later
    if (user._id.toString() === unsealed._id.toString()) return { auth: true };
    throw new Error("User not signed in");
  } catch (err) {
    return { auth: false };
  }
};

exports.checkAdminAuth = checkAdminAuth;
