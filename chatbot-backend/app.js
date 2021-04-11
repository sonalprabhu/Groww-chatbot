/**
 * This is entry point for Groww Pilot Backend Application which creates app context and finally sends to server.js for activating the server
 * The specifications are as follows:-
 * 1) api_config - Contains all the helper functions to create router,dynamic answer functions, dynamic answer handlers, response mappers for faq,product and kyc faqs,etc
 * 2) models - Contains database schema models using Mongoose
 * 3) node_modules - Contains all application libraries or dependencies
 * 4) routes - Contains all the API routes 
 * 5) mock_data - Contains utility functions and db seeding mock data and functions to populate the database with values
 * 6) __tests__ - Contains the test case files for checking the important API endpoints for the chatbot as well as basic routes using Jest and Supertest suite
 * 7) assets - Contains a single image file showing the category tree used in this project
 * 
 * The application uses NodeJS,Mongoose,MongoDB as tech stack for this application and Jest/Supertest for test cases.
 * Chatbot APIs are documented as part of Swagger UI which runs at port 8080 and the backend application runs at port 8081
 * Backend URL:- http://localhost:8081/
 * Swagger UI URL:- http://localhost:8080/swagger-ui
 */

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const {router} = require('./routes/routes');
const { populateBackend } = require("./mock_data/populate_backend");
const app = express();

//put ur MONGODB_URI in .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", async () => {
  console.log("connected to mongodb");
  populateBackend();//this function call to be used only when db clean up or refilling of data required.
});
const corsOptions = {
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", () => {
  console.log("Welcome to Groww pilot backend");
});

app.use(router);

exports.app = app;
