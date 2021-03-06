const {Faq} = require('../models/faqs');
const {User} = require('../models/user');
const {app} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Iron = require('@hapi/iron');
const { getAnswerDynamicQuestion } = require('../api_config/dynamic_answer_mapper');

describe("Testing '/get-answer-by-questionId' API",()=> {

    it(`tests '/get-answer-by-questionId' for static questions requiring no context`,async (done)=>{
        let allFaqs = await Faq.find({}).lean().exec();
        allFaqs = allFaqs.filter((faq)=>{
            for(const faqQuestionAnswerObj of faq.faqQuestionAnswer){
                if(faqQuestionAnswerObj.faqIsDynamic){
                    return false;
                }
            }
            return true;
        });
        const randomFaq = allFaqs[Math.floor(Math.random()*allFaqs.length)];
        const randomQuestionPos = Math.floor(Math.random()*randomFaq.faqQuestionAnswer.length);
        let answerArr = randomFaq.faqQuestionAnswer[randomQuestionPos].faqAnswer;
        answerArr = answerArr.map((a)=>{
            const id = a._id.toString();
            delete a._id;
            return {_id: id,...a};
        });
        const expectedResponse = {'Answer': answerArr};
        const response = await supertest(app).get(`/get-answer-by-questionId/${randomFaq._id.toString()}/${randomQuestionPos}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedResponse);
        done();
    });

    it(`tests '/get-answer-by-questionId' for dynamic questions requiring context`,async (done)=>{
        let allFaqs = await Faq.find({}).select('+faqQuestionAnswer.faqDynamicKey').exec();
        allFaqs = allFaqs.filter((faq)=>{
            for(const faqQuestionAnswerObj of faq.faqQuestionAnswer){
                if(faqQuestionAnswerObj.faqIsDynamic){
                    return true;
                }
            }
            return false;
        });
        const randomFaq = allFaqs[Math.floor(Math.random()*allFaqs.length)];
        let idx=0;
        for(;idx<randomFaq.faqQuestionAnswer.length;idx++){
            if(randomFaq.faqQuestionAnswer[idx].faqIsDynamic){
                break;
            }
        }
        const unsealed = await Iron.unseal(randomFaq.faqQuestionAnswer[idx].faqDynamicKey,process.env.DYNAMIC_ANSWER_SECRET,Iron.defaults);
        const sampleUser = await User.findOne({}).populate('userOrdersDocs').exec();
        const sampleOrder = sampleUser.userOrdersDocs[Math.floor(Math.random()*sampleUser.userOrdersDocs.length)];
        const sampleProductId = sampleOrder.products[0].toString();
        const sampleContext = {user: sampleUser._id.toString(),order: sampleOrder._id.toString(),product: sampleProductId};
        let answer = '';
        try{
            answer = await getAnswerDynamicQuestion(unsealed['answerFunc'],sampleContext);
        }
        catch(err){
            answer = err['res'];
        }
        const expectedResponse = {'Answer': answer};
        const response = await supertest(app).get(`/get-answer-by-questionId/${randomFaq._id.toString()}/${idx}`).query({
            ...sampleContext
        });
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expectedResponse);
        done();
    });

    it(`tests '/get-answer-by-questionId' invalid faq id`,async (done)=>{
        const response = await supertest(app).get(`/get-answer-by-questionId/invalidid`);
        expect(response.status).toBe(404);
        done();
    })
    
    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});