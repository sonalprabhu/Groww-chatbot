const {app} = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const { User } = require('../models/user');

describe("Testing '/getUserDetails' API",()=> {

    it(`tests '/getUserDetails' , valid user id`,async (done)=>{
        const sampleUser = await User.findOne({}).exec();
        const response = await supertest(app).get(`/getUserDetails/${sampleUser._id.toString()}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual({
            userName: sampleUser.userName,
            userDOB: sampleUser.userDOB,
            userMob: sampleUser.userMob,
            userMaritalStatus: sampleUser.userMaritalStatus,
            userGender: sampleUser.userGender,
            userOrderPlacedToday: sampleUser.userOrderPlacedToday,
        });
        done();
    });

    it(`tests '/getUserDetails' , invalid user id`,async (done)=>{
        const response = await supertest(app).get(`/getUserDetails/invalidis`);
        expect(response.status).toBe(404);
        done();
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
});