const {Faq} = require('../models/faqs');
const {Category} = require('../models/category');
const {app} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');

describe("Testing '/get-question-by-category' API",()=> {

    it(`tests '/get-question-by-category' , valid category Id and has no sub categories`,async (done)=>{
        const validCategories = await Category.find({hasSubCategory: false}).populate('faqs').exec();
        const sampleCategory = validCategories[Math.floor(Math.random()*validCategories.length)];
        let expectedFaqs = await Faq.find({faqCategoryName: sampleCategory.categoryName}).exec();
        expectedFaqs = expectedFaqs.map((faq)=>faq.toJSON());
        expectedFaqs = expectedFaqs.flatMap((faqDoc)=>{
            const faqResponse = faqDoc.faqQuestionAnswer.filter((q)=>(q.faqIsDynamic === false)).map((q,idx)=>{
                return {   
                    QuestionId: faqDoc._id.toString(),
                    QuestionPos: idx,
                    QuestionText: q.faqQuestion,
                    faqUpvoteCount: q.faqUpvoteCount,
                    faqDownvoteCount: q.faqDownvoteCount
                };
            });
            return faqResponse;
        });

        expectedFaqs.sort((a,b)=>{
            if((b.faqUpvoteCount - a.faqUpvoteCount)>0){
              return 1;
            }
            else if((b.faqUpvoteCount - a.faqUpvoteCount)<0){
              return -1;
            }
            else{
              return (a.faqDownvoteCount-b.faqDownvoteCount);
            }
          });

        expectedFaqs = expectedFaqs.map((q)=>{
            delete q.faqUpvoteCount;
            delete q.faqDownvoteCount;
            return q;
          });
        const response = await supertest(app).get(`/get-question-by-category/${sampleCategory._id.toString()}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedFaqs);
        done();
    });

    it(`tests '/get-question-by-category' , valid category Id and has sub categories`,async (done)=>{
        const validCategories = await Category.find({hasSubCategory: true}).populate('faqs').exec();
        const sampleCategory = validCategories[Math.floor(Math.random()*validCategories.length)];
        const response = await supertest(app).get(`/get-question-by-category/${sampleCategory._id.toString()}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual([]);
        done();
    });

    it(`tests '/get-question-by-category' , invalid category Id `,async (done)=>{
        const response = await supertest(app).get(`/get-question-by-category/invalidid`);
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/get-question-by-category' , empty category Id `,async (done)=>{
        const response = await supertest(app).get(`/get-question-by-category`);
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});