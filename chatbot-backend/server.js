/**
 * Created By: Arnab Ghosh
 * This file is responsible for activating the server by taking app context from app.js and configuring swagger options
 */

const {app} = require('./app');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const APP_PORT = process.env.PORT || process.env.APP_PORT_NO || 8081;//default port set to 8081
const SWAGGER_PORT = process.env.SWAGGER_UI_PORT_NO || 8080;//default port for Swagger UI routes set to 8080

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: 'Groww chatbot API Reference',
            version: '1.0.0',
            description: 'This reference contains the information about APIs used in Groww pilot application including contextual chatbot',
            contact: {
                email: 'arnabghosh31031998@gmail.com'
            },
            servers: [
                {
                    url: `http://localhost:${APP_PORT}`
                }
            ]
        }
    },
    apis: ['./routes/admin_routes/*.js','./routes/chatbot_routes/*.js','./routes/basic_routes/*.js','./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger-ui',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const server = app.listen(APP_PORT,()=>{
    console.log(`Server listening at port ${APP_PORT}`);
});

//Swagger UI starts listening
app.listen(SWAGGER_PORT, () => {
    console.log(`Swagger ui running at port ${SWAGGER_PORT}`);
});

module.exports = server;