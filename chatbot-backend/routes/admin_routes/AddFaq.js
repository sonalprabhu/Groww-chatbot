const { router } = require("../../api_config/CreateRouter");
const { checkAdminAuth } = require("../../api_config/CheckAuthAdmin");
const { Faq } = require("../../models/faqs");
const { Category } = require("../../models/category");
const Iron = require("@hapi/iron");

router.post("/addFaq", async (req, res) => {
  try {
    const isAuthenticated = await checkAdminAuth(req);
    if (!isAuthenticated.auth) {
      res
        .clearCookie(process.env.ADMIN_AUTH_TOKEN_NAME)
        .clearCookie("userName")
        .status(401)
        .json({ auth: false });
    } else {
      let faq = req.body;

      const faqCategoryName =
        faq.faqCategoryPath[faq.faqCategoryPath.length - 1];
      delete faq.faqCategoryPath;
      faq["faqUpvoteCount"] = 0;
      faq["faqDownvoteCount"] = 0;
      faq["faqDynamicKey"] = await Iron.seal(
        { answerFunc: faq["faqDynamicKey"] },
        process.env.DYNAMIC_ANSWER_SECRET,
        Iron.defaults
      );

      let faqSaved = {};
      if (faq.faqSameCategory) {
        let faqDoc = await Faq.findOne({ faqCategoryName })
          .select("+faqQuestionAnswer.faqDynamicKey")
          .exec();
        if (
          faqDoc === null ||
          faqDoc === undefined ||
          Object.keys(faqDoc.toJSON()).length === 0
        ) {
          let faqObj = new Faq({
            faqQuestionAnswer: faq,
            faqCategoryName,
          });
          faqSaved = await faqObj.save();
          await Category.updateOne(
            { categoryName: faqCategoryName },
            { $push: { faqId: faqSaved._id } }
          ).exec();
        } else {
          await Faq.updateOne(
            { _id: faqDoc._id },
            {
              $set: {
                faqQuestionAnswer: faqDoc
                  .toJSON()
                  .faqQuestionAnswer.concat(faq),
              },
            }
          ).exec();
          faqSaved = faqDoc;
        }
      } else {
        let faqObj = new Faq({
          faqQuestionAnswer: faq,
          faqCategoryName,
        });
        faqSaved = await faqObj.save();
        await Category.updateOne(
          { categoryName: faqCategoryName },
          { $push: { faqId: faqSaved._id } }
        ).exec();
      }
      res.status(201).json({ faqId: faqSaved._id.toString(), auth: true });
    }
  } catch (err) {
    res.status(404).json({ error: "Faq already exists in the database" });
  }
});

exports.router = router;
