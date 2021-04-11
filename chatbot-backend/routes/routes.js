/**
 * @swagger
 * components:
 *  schemas:
 *      FaqQuestionAnswer:
 *          type: object
 *          required:
 *              - faqQuestion
 *              - faqAnswer
 *              - faqIsDynamic
 *              - faqDynamicKey
 *              - faqUpvoteCount
 *              - faqDownvoteCount
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto generated id of each faq question answer object
 *              faqQuestion:
 *                  type: string
 *                  description: The question text of the faq
 *              faqAnswer:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/FaqAnswer'
 *              faqIsDynamic:
 *                  type: boolean
 *                  description: The flag value for checking whether faq demands dynamic answers or not
 *              faqDynamicKey:
 *                  type: string
 *                  description: The dynamic key value for the function responsible for generating answers if faqIsDynamic is set to true
 *              faqUpvoteCount:
 *                  type: integer
 *                  description: The upvote count value of the faq object
 *              faqDownvoteCount:
 *                  type: integer
 *                  description: The downvote count value of the faq object
 *              
 *      FaqAnswer:
 *          type: object
 *          required:
 *              - faqAnswerText
 *              - faqAnswerType
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto generated id of each faq answer object
 *              faqAnswerText:
 *                  type: string
 *                  description: The answer text of each faq answer object
 *              faqAnswerType:
 *                  type: string
 *                  description: The answer type of each faq answer object
 *          example:
 *              _id: 6071c3566ee30e0888ce3fc3
 *              faqAnswerText: Margin is the money you borrow from Groww (broker) to trade in stocks.,
 *              faqAnswerType: text
 *      Faq:
 *          type: object
 *          required:
 *              - faqQuestionAnswer
 *              - faqCategoryName
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id of the faq object
 *              faqQuestionAnswer:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/FaqQuestionAnswer'
 *                  description: Contains the questions and answers of a faq object
 *              faqCategoryName:
 *                  type: string
 *                  description: Contains the leaf node value of a particular category object
 *      FaqResponse:
 *          type: object
 *          required:
 *              - QuestionId
 *              - QuestionPos
 *              - QuestionText
 *          properties:
 *              QuestionId:
 *                  type: string
 *                  description: The id of the fetched faq object
 *              QuestionPos:
 *                  type: integer
 *                  description: The index of the question number in the faq object
 *              QuestionText:
 *                  type: string
 *                  description: The text of the question at that index position of the faq
 *      Category:
 *          type: object
 *          required:
 *              - categoryName
 *              - subCategoryId
 *              - hasSubCategory
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id of the category object
 *              categoryName:
 *                  type: string
 *                  description: The category name of the category
 *              subCategoryId:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: category id of the child categories
 *              hasSubCategory:
 *                  type: boolean
 *                  description: Flag value of checking whether a category has sub categories or not
 *              faqId:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: faq id of the associated faqs
 *      User:
 *          type: object
 *          required:
 *              - userName
 *              - userPass
 *              - userKyc
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto generated id of the user object
 *              userName:
 *                  type: string
 *                  description: user name of the user
 *              userPass:
 *                  type: string
 *                  description: password of the user
 *              userDOB:
 *                  type: string
 *                  description: Date of birth of the user
 *              userMob:
 *                  type: string
 *                  description: Mobile number of the user
 *              userMaritalStatus:
 *                  type: string
 *                  description: Marital status of the user
 *              userGender:
 *                  type: string
 *                  description: Gender of the user
 *              userMaxOrdersPerDay:
 *                  type: integer
 *                  description: Limit on the number of orders that can be made each day
 *              userOrderPlacedToday:
 *                  type: integer
 *                  description: No of orders placed on a day by the user
 *              userOrders:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: order id of the associated orders
 *              userKyc:
 *                  type: object
 *                  required:
 *                      - status
 *                  properties:
 *                      _id:
 *                          type: string
 *                          description: The auto generated id of the kyc object
 *                      status:
 *                          type: string
 *                          description: The status of the kyc of the user(Completed/Not completed)
 *                      documents:
 *                          type: object
 *                          required:
 *                              - pan
 *                              - addressProof
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: The auto generated id of the documents object
 *                              pan:
 *                                  type: string
 *                                  description: PAN number of the user
 *                              addressProof:
 *                                  type: string
 *                                  description: Address proof of the the user
 *      Product:
 *          type: object
 *          required:
 *              - productCategory
 *              - productName
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto generated id of the product object
 *              productCategory:
 *                  type: string
 *                  description: The category of the product (Stocks,FDs,Mutual Funds, Gold)
 *              productPrice:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          description: The auto generated id of the product price object
 *                      stockPrice:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: The auto generated id of the stock price object
 *                              nse:
 *                                  type: string
 *                                  description: National Stock Exchange value of the product
 *                              bse:
 *                                  type: string
 *                                  description: Bombay Stock Exchange value of the product
 *                      fundReturns:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: The auto generated id of the fund returns object
 *                              sixMonths:
 *                                  type: string
 *                                  description: Six months return value of the fund
 *                              oneYear:
 *                                  type: string
 *                                  description: One year return value of the fund
 *                              threeYear:
 *                                  type: string
 *                                  description: Three year return value of the fund
 *                              fiveYear:
 *                                  type: string
 *                                  description: Five year return value of the fund
 *                              all:
 *                                  type: string
 *                                  description: Overall return value of the fund
 *                      fd:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: The auto generated id of the fd object
 *                              rateOfInterest:
 *                                  type: string
 *                                  description: Rate of interest of the fd
 *                              minAmount:
 *                                  type: string
 *                                  description: Minimum amount to open the fd
 *                              compounding:
 *                                  type: string
 *                                  description: Compounding status (Quaterly,Monthly,Annually)
 *                              prematureWithdrawal:
 *                                  type: string
 *                                  description: Premature withdrawal status (Available,Not available)
 *                      purity:
 *                          type: string
 *                          description: Purity value of digital gold
 *              productName:
 *                  type: string
 *                  description: Name of the product
 *              productUrl:
 *                  type: string
 *                  description: Image url of the product
 *              productMaxUnitsPerOrder:
 *                  type: integer
 *                  description: Maximum no of units of this product that can be put in a single order
 *          example:
 *              _id: 6071c3666ee30e0888ce4109
 *              productCategory: Stocks
 *              productPrice:
 *                  _id: 6071c3666ee30e0888ce410a
 *                  stockPrice:
 *                      _id: 6071c3666ee30e0888ce410b
 *                      nse: 812.60
 *                      bse: 812.25
 *                  fundReturns:
 *                      _id: 6071c3666ee30e0888ce410c
 *                      sixMonths: "" 
 *                      oneYear: ""
 *                      threeYear: ""
 *                      fiveYear: ""
 *                      all: ""
 *                  fd:
 *                      _id: 6071c3666ee30e0888ce410d
 *                      rateOfInterest: ""
 *                      minAmount: ""
 *                      compounding: ""
 *                      prematureWithdrawal: ""
 *                  purity: ""
 *              productName: Heranba Industries
 *              productMaxUnitsPerOrder: 2
 *              productUrl: https://assets.thehansindia.com/h-upload/2021/02/16/1031553-heranba.webp       
 *      Order:
 *          type: object
 *          required:
 *              - orderStatus
 *              - orderDate
 *              - category
 *              - products
 *              - units
 *              - userId
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto generated id of the order object
 *              orderStatus:
 *                  type: string
 *                  description: order status of the category(pending,cancelled,completed)
 *              orderDate:
 *                  type: string
 *                  description: date of the order
 *              category:
 *                  type: string
 *                  description: category of the order(Stocks,FDs,Mutual Funds,Gold)
 *              products:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: product id of the product objects
 *              units:
 *                  type: array
 *                  items:
 *                      type: integer
 *                      description: units of a product ordered
 *              userId:
 *                  type: string
 *                  description: user id of the user who placed the order 
*/

 /**
 * @swagger
 *  tags:
 *      name: Faqs
 *      description: Chatbot managing API
 */

require('./admin_routes/admin_routes');
require('./basic_routes/basic_routes');
require('./chatbot_routes/chatbot_routes');
const {router} = require('../api_config/CreateRouter');
exports.router = router;