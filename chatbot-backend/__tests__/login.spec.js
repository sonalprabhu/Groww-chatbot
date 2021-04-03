const {app} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');

describe("Testing '/login' API",()=> {

    it(`tests '/login' , valid username and valid password`,async (done)=>{
        const response = await supertest(app).get(`/login`).query({
            userName: 'alice@gmail.com',//valid userName
            userPass: 'pAsSwWoRd1!',//valid password
        });
        expect(response.status).toBe(200);
        done();
    });

    it(`tests '/login' , valid username and invalid password`,async (done)=>{
        const response = await supertest(app).get(`/login`).query({
            userName: 'alice@gmail.com',//valid userName
            userPass: 'pAsSwWoR',//invalid password
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/login' , invalid username and valid password`,async (done)=>{
        const response = await supertest(app).get(`/login`).query({
            userName: 'some random user',//invalid userName
            userPass: 'pAsSwWoRd1!',//valid password
        });
        expect(response.status).toBe(404);
        done();
    });

    it(`tests '/login' , invalid username and invalid password`,async (done)=>{
        const response = await supertest(app).get(`/login`).query({
            userName: 'some random user',//invalid userName
            userPass: 'pAsSwWoR',//invalid password
        });
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});