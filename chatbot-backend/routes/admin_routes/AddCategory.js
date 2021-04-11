const {router} = require("../../api_config/CreateRouter");
const { checkAdminAuth } = require("../../api_config/CheckAuthAdmin");
const {Category} = require("../../models/category");

router.post("/addCategory",async (req,res) => {
    try{
        const isAuthenticated = await checkAdminAuth(req);
        if (!isAuthenticated.auth) {
            res
              .clearCookie(process.env.ADMIN_AUTH_TOKEN_NAME)
              .clearCookie("userName")
              .status(401)
              .json({ auth: false });
        }
        else{
            const {categoryName,categoryParent,subCategories} = req.body;
            const categoryObj = new Category({
                categoryName,
                hasSubCategory: (subCategories.length !== 0),
                subCategoryId: [],
                faqId: [],
            });
            const categoryDoc = await categoryObj.save();
            await Category.updateOne({categoryName: categoryParent},{$push: {subCategoryId: categoryDoc._id}}).exec();
            let subCategoryIds = [];
            for(const subCategory of subCategories){
                const subCategoryObj = new Category({
                    categoryName: subCategory,
                    hasSubCategory: false,
                    subCategoryId: [],
                    faqId: [],
                });
                const subCategoryDoc = await subCategoryObj.save();
                subCategoryIds.push(subCategoryDoc._id);
            }
            await Category.updateOne({_id: categoryDoc._id.toString()},{$set: {subCategoryId: subCategoryIds}}).exec();
            res.status(200).json({categoryId: categoryDoc._id.toString(),auth: true});
        }        
    }
    catch(err){
        res.status(404).json({error: 'Cannot add the given category'});
    }
});

exports.router = router;