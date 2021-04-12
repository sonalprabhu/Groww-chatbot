# GROWW-T11
Team ID: GROWW-T11 | Team Members: Arnab Ghosh &amp; Sonal Prabhu

![Groww-website](https://user-images.githubusercontent.com/35455325/114377392-3d47f580-9ba4-11eb-83d9-f4f16f33669a.JPG)

![Groww-admin-portal-add-faq](https://drive.google.com/file/d/1MWQOqxID2ulxeWSujsHk5NpnpTeQ0Pkz/view?usp=sharing)

# Deployed URLs
1. Chatbot-Frontend - https://groww-chatbot-website.netlify.app/stocks
2. Chatbot-Backend - https://groww-t11-chatbot-backend.herokuapp.com/
3. Chatbot-Admin - https://groww-t11-chatbot-admin.herokuapp.com/

# Architecture design resources
1. Chatbot Category tree diagram (JPEG):- https://drive.google.com/file/d/1K4HpJ2e1-SQMplDmlJtAIws8fhOpxu36/view?usp=sharing

2. Chatbot Category tree details (PDF) :- https://drive.google.com/file/d/1j6Ptab-RUNqUM_DpXaIn1t8LN4WbidkH/view?usp=sharing

3. Chatbot context design architecture overview (PDF):- https://drive.google.com/file/d/1kkTnLownxQPChXhkrMd_8_TOpd1WHB0v/view?usp=sharing

# Technology Stack Used
* Chatbot-Frontend:-
    1. ReactJS
    2. HTML,CSS,Bootstrap

* Chatbot-Backend:-
    1. NodeJS + ExpressJS (REST API architecture)
    2. MongoDB + Mongoose
    3. Jest + Supertest (Test suite)

* Chatbot-Admin:-
    1. ReactJS
    2. HTML,CSS,Bootstrap,Material UI


# Chatbot Frontend Folder Structure
* **src/app** - Contains Redux store and reducers
* **src/assets** - Contains image files
* **src/chatbot** - Contains chatbot config files which handle responses in chatbot
* **src/chatbot-widgets** - Custom components that are used by chatbot
* **src/components** - Contains basic pages for the dummy Groww website
* **src/services** - Includes function for login/logout

# Chatbot Backend Folder Structure
* **api_config** - Contains files for configuring the request/response mappers along with router creation.
* **mock_data** - Contains files for mock data used for application tsting along with database seeding procedures or utility scripts.
* **__tests__** - Contains the test case files for testing API endpoints
* **assets** - Contains images for design architecture of the chatbot
* **models** - Contains the database models/schemas for the various objects used
* **routes** - Contains basic_routes,admin_routes and chatbot_routes folders for holding of the API endpoints code for the entire application

# Chatbot Admin Folder Structure
* **src/components** - Contains the various forms and Secured Routes components used in the chatbot-admin portal
* **src/Config** - Contains the path URLs for different forms along with secured flags
* **src/Context** - React Context API and useReducer Hook for state management of superuser doing the actions on the portal
* **src/queries** - Contains all the API call functions to the backend using axios.



# Chatbot
We have used an npm package react-chatbot-kit developed by Fredrik Oseberg which can be found at [react-chatbot-kit](https://github.com/FredrikOseberg/react-chatbot-kit)

# Features
1. Based on the page context and the user context, the FAQ's that appear are different. Feel free to explore different set of questions shown to a logged in user, non-logged in user, KYC completed user, KYC incomplete user and a guest at different pages
2. To allow for the factor of usefulness of the FAQ's, a simple like/dislike button is provided for each question which affects the order in which questions appear to the user
3. At Account>Configure Settings, an option is provided to the user to set maximum orders per day. If the user happens to exceed this limit, the chatbot alerts the user about their purchase attempt.
4. For adding a faq you can have two options as part of working:-
    * Add a faq via our chatbot-admin portal
    * Put the data in mock_data folder in data.js file and finally run populate_backend.js that will take care of the rest
5. For adding a new category we have only one option which is to go to our chatbot-admin portal and go to "Add Category" section.
6. Test suite is being prepared in chatbot-backend to monitor API endpoints and their performances. Feel free to explore the endpoints and their testing mechanisms.

Note: 
1) For chatbot frontend a "clear messages" button is given beside the chatbot icon. Feel free to clear away the clutter
2) For the backend, mock_data contains sample information only to be used for db seeding and is there only to give structure of the data and how their extensibility will tentatively for more heavy-traffic data.
3) For user authentications, we have used cookies based sessions which can be changed as per requirements.

Feel free to share your feedbacks and suggestions for more improvements