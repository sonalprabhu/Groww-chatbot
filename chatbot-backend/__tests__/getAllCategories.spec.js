const {User} = require('../models/user');
const {Category} = require('../models/category');
const {app} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');

describe("Testing '/get-all-categories' API",()=> {

    it(`tests '/get-all-categories' for no category id and no user`,async (done)=>{
        const rootCategory = await Category.findOne({categoryName: 'root'}).populate('subCategories').exec();
        const expectedCategories = rootCategory
                                    .subCategories
                                    .filter((sc)=>( sc.categoryName !== 'Orders' && 
                                                    sc.categoryName !== 'Products' && 
                                                    sc.categoryName !== 'My Account'))
                                    .map((sc)=>{
                                        return {
                                            categoryId: sc._id.toString(),
                                            Name: sc.categoryName,
                                            hasSubCategory: sc.hasSubCategory,
                                        }
                                    });
        const response = await supertest(app).get('/get-all-categories');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedCategories);
        done();
    });

    it(`tests '/get-all-categories' for no category id and a valid user`,async (done)=>{
        const rootCategory = await Category.findOne({categoryName: 'root'}).populate('subCategories').exec();
        const expectedCategories = rootCategory
                                    .subCategories
                                    .filter((sc)=>( sc.categoryName !== 'Orders' && 
                                                    sc.categoryName !== 'Products'))
                                    .map((sc)=>{
                                        return {
                                            categoryId: sc._id.toString(),
                                            Name: sc.categoryName,
                                            hasSubCategory: sc.hasSubCategory,
                                        }
                                    });
        const sampleUser = await User.findOne({}).exec();
        const response = await supertest(app).get('/get-all-categories').query({
            user: sampleUser._id.toString(),
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedCategories);
        done();
    });

    it(`tests '/get-all-categories' for valid category id`,async (done)=>{
        const validCategoryHavingSubCategory = await Category.findOne({$and: [{$nor: [{categoryName: 'root'}]},{hasSubCategory: true}]}).populate('subCategories').exec();
        const expectedCategories = validCategoryHavingSubCategory
                                    .subCategories
                                    .map((sc)=>{
                                        return {
                                            categoryId: sc._id.toString(),
                                            Name: sc.categoryName,
                                            hasSubCategory: sc.hasSubCategory,
                                        }
                                    });
        const response = await supertest(app).get('/get-all-categories').query({
            id: validCategoryHavingSubCategory._id.toString(),
            user: 'some random user',
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedCategories);
        done();
    })
    
    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});