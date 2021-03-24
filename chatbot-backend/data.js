const {browseSimilarProducts,getCurrentStockHolding,checkAvailabilityPreviousOrders} = require('./dynamic_questions_handler');
let faqArr = [
    {
        faqQuestionText: 'If I verify with TPIN, will it sell all my holdings?',
        faqCategoryPath: ['Stocks','Demat Account'],
        faqAnswerText: [`No. Once you verify via TPIN by CDSL, it only verifies your existing holdings so that you can place your sell order whenever you want in a secure manner.`,
                        `The approval is valid for 1 day for your Demat account after which you will require to verify again.`,
                        `We assure you that no sell order will be placed without your approval.`,
                        `Use the link below to verify your holdings`,
                        `https://groww.in/cdslauth`],
        faqIsDynamic: false,
        faqDynamicAnswer: null
    },
    {
        faqQuestionText: 'How will off market transactions show up in my holding?',
        faqCategoryPath: ['Stocks','Holdings'],
        faqAnswerText: ['Off market transactions will show up in your holdings after it reflects in your demat account.',
                        'It takes 2 working days after the transaction date to show up (T+2).',
                        'Please raise a ticket if it has been more than 2 days.'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How to invest in IPO?',
        faqCategoryPath: ['Stocks','IPO'],
        faqAnswerText: [`Here are steps to apply for IPO`,
                        `Visit https://groww.in/ipo`,
                        `You will see the list of open IPOs. Press the 'APPLY' button beside the IPO name you want to apply for.`,
                        `In the box on the right side, enter the number of shares you want to apply for`,
                        `Press the 'CONTINUE' button.`,
                        `Enter your UPI ID. You will get this from your UPI app (Google Pay, PhonePe, etc).`,
                        `Press the 'CONTINUE' button.`,
                        `You will be able to see a timeline of your IPO application process and the tentative allotment date.`,
                        `Within 24 hours, you will get a UPI mandate request on your UPI app. Approve it.`,
                        `Note: The UPI mandate request may come instantly or may take up to 24 hours to come.`,
                    ],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'What is stocks margin?',
        faqCategoryPath: [`Stocks`,`Margin`],
        faqAnswerText: [`Margin is the money you borrow from Groww (broker) to trade in stocks.`,
                        `With the margin feature on Groww, you are able to buy stocks for as low as 15% of the total value of the stock.`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'What are account maintainance charges?',
        faqCategoryPath: ['Stocks','Charges'],
        faqAnswerText: ['This is Rs 0 on Groww.',
                        'Most platforms charge an annual maintenance charge (AMC) for the demat account.',
                        'On Groww, we do not have any AMC.',
                        'Go to the link below to view pricing on stocks.',
                        'https://groww.in/pricing/stocks'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How can I access my stocks P&L report?',
        faqCategoryPath: ['Stocks','P&L Reports'],
        faqAnswerText: ['You can request your stocks P&L report in the Reports section.'],
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How much does Groww charge for stocks?',
        faqCategoryPath: ['Stocks','Others'],
        faqAnswerText: [`Account opening=Rs 0`,
                        `Annual maintenance charge (AMC) = Rs 0`,
                        `Brokerage = Rs 20 or 0.05% per order (whichever is lower)`,
                        `Regulatory & statutory charges, penalties, and GST is extra and depends on the type of order.`,
                        `You can use the brokerage calculator to get an estimate of all the charges involved.`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How to start a SIP on Groww?',
        faqCategoryPath: ['Mutual Funds','My SIPs'],
        faqAnswerText: [`Visit https://groww.in/mutual-funds/filter.`,
                        `Search or choose a mutual fund.`,
                        `Choose 'Monthly SIP'`,
                        `Enter the amount to invest`,
                        `Pay via UPI/Netbanking/NEFT`,
                        `Don't forget to add Biller/OTM/AutoPay for future installments.`,
                        `Visit the link below to learn more about choosing mutual funds`,
                        `https://groww.in/blog/how-to-choose-mutual-funds-in-india/`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How do I pay for a missed installment?',
        faqCategoryPath: ['Mutual Funds','AutoPay'],
        faqAnswerText: [`Go to MY SIPS.`,
                        `Beside the mutual fund's name, you will see 'Invest' written. Click on it.`,
                        `Enter the amount and choose 'One-Time'`,
                        `Complete the payment.`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How do I import my external mutual fund investments',
        faqCategoryPath: ['Mutual Funds','Import Funds'],
        faqAnswerText: [`Visit https://groww.in/track/request`,
                        `Tap on 'Connect with Google'.`,
                        `Choose the email ID in which you receive statements of your external mutual funds.`,
                        `Continue on with the next steps.`,
                        `Give permission to Groww to read your email. In 1-2 days, you will be able to see your external investments on the dashboard. Your imported investments will be updated every 30 days.`,
                        `Note: Groww does not have access to any of your emails except the ones that come from fonotreply@camsonline.com and samfS@kfintech.com. Groww can only read messages that are from CAMS and Karvy so as to be able to read the mutual funds statements.`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'What is Digital Gold?',
        faqCategoryPath: ['Gold','About Digital Gold'],
        faqAnswerText: ['Digital Gold is a convenient and cost-effective way of purchasing gold online.'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How do I buy Digital Gold on Groww?',
        faqCategoryPath: ['Gold','Buying Gold'],
        faqAnswerText: [`Enter the amount. You can input your desired purchase amount in rupees or grams of gold.`,
                        `Buy in one-click: Review your order to make quick payment within the 5-minute price window.`,
                        `Secured and insured: Your gold locker will be updated, where you can view your purchased Digital Gold holdings.`,
                        `Visit the link below to login and buy gold.`,
                        `https://groww.in/dashboard/explore/stocks`,
                    ],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How do I sell Digital Gold purchased on Groww?',
        faqCategoryPath: ['Gold','Selling Gold'],
        faqAnswerText: [`Digital Gold purchased on Groww can be sold back to Augmont anytime after the 2-day holding period from the date of purchase.`,
                        `Click on the sell tab: Enter units to sell at the current selling price shown.`,
                        `Sell in one-click: Review and place your sell request within the 5-minute price window.`,
                        `Request confirmed: Your gold locker will be updated, where you can view your Digital Gold balance.`,
                        `You will receive the amount in your chosen bank account within 2 working days.`,
                        `Visit the link below to check your gold.`,
                        `https://groww.in/dashboard/investments/gold`,
                    ],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How is the storage of physical gold taking place?',
        faqCategoryPath: ['Gold','Gold Storage & Insurance'],
        faqAnswerText: [`The physical gold is stored by Augmont in 100% secured Sequel's vaults and insured (verified by an IDBI Trusteeship Service Pvt. Ltd. - an independent trustee).`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How many fixed deposits can I open?',
        faqCategoryPath: ['FDs','About FDs'],
        faqAnswerText: ['If your KYC is verified, you can open as many fixed deposits as you wish. However, till your KYC is under process, you can place only one order for opening a fixed deposit.'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Why did my fixed deposit investment fail?',
        faqCategoryPath: ['FDs','FD Orders'],
        faqAnswerText: [`Your fixed deposit investment may fail due to incorrect/mismatched data in the KYC documents submitted resulting in KYC rejection or due to payment issues while booking the fixed deposit`,
                        `Please re-upload your documents or retry making the payment.`,
                        `If this is a recurring issue, please raise a ticket. We'll resolve this issue as soon as possible.`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How to get a TDS certificate for my fixed deposit?',
        faqCategoryPath: ['FDs','Taxation'],
        faqAnswerText: [`You can download the TDS certificate from the bank's website/app via net banking.`],
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'Can I withdraw my fixed deposit before maturity?',
        faqCategoryPath: ['FDs','Withdrawal'],
        faqAnswerText: [`Premature withdrawal of fixed deposits is not allowed for tax-saver deposits and monthly interest payout deposits.`,
                        `Any other type of fixed deposit can be withdrawn before maturity.`,
                        `Please refer to the 'FD Details' section of any fixed deposit for premature penalty information.`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How to change email address?',
        faqCategoryPath: ['My Account','Groww Account'],
        faqAnswerText: ['Please raise a ticket. We will help you with this matter.',
                        'Visit the link below to raise a ticket and address the issue.',
                        'https://groww.in/user/help/tickets/create',
                    ],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'What are the documents required for getting my full KYC done?',
        faqCategoryPath: ['My Account','KYC'],
        faqAnswerText: [`You will need to upload the following`,
                        `Photo of PAN card`,
                        `Address proof (DL, Aadhar, Voter's ID)`,
                        `Photo of signature`,
                        `Passport size photo and`,
                        `Short 5 sec video of you holding your PAN card`,
                        `Visit the link below to proceed with uploading your documents.`,
                        `https://groww.in/onboarding/upload`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Can I invest using a credit/debit card?',
        faqCategoryPath: ['My Account','Bank Accounts'],
        faqAnswerText: [`No, it is not possible to invest using credit/debit card on Groww.`,
                        `SEBI rules say the investments should be made through verified bank accounts only.`,
                        `It is not possible to verify bank accounts when investments are made using a credit/debit card.`,
                        `You can use the either UPI apps (Google Pay,PhonePe,BHIM,etc), Net banking or NEFT/RTGS/IMPS`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How to add money for Groww Balance?',
        faqCategoryPath: ['My Account','Payments'],
        faqAnswerText: [`Here's how you can add money to your Groww Balance`,
                        `Visit https://groww.in/user/balance/inr`,
                        `Tap on the button 'Add Money'`,
                        `Enter the amount you want to invest and tap 'Add Money'`,
                        `Then,complete the payment.`,
                        `The money will show in your Groww Balance.`],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Browse similar products?',
        faqCategoryPath: ['Orders','Completed'],
        faqAnswerText: [''],
        faqIsDynamic: true,
        faqDynamicAnswer: browseSimilarProducts,
    },
    {
        faqQuestionText: 'How to cancel an order?',
        faqCategoryPath: ['Orders','Completed'],
        faqAnswerText: ['You can cancel the order before it goes in closed status.'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Is there a penalty for cancellation?',
        faqCategoryPath: ['Orders','Completed'],
        faqAnswerText: ['No there is no penalty for order cancellation.'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How to place a buy order?',
        faqCategoryPath: ['Orders','Not completed'],
        faqAnswerText: ['Move to a specific category,select your product and press on buy.'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How to place a redeem order?',
        faqCategoryPath: ['Orders','Not completed'],
        faqAnswerText: ['Visit the link below',
                        'https://groww.in/blog/mutual-fund-redemption-what-is-it-and-how-to-redeem-fund-units/'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'How to do the payment of an order?',
        faqCategoryPath: ['Orders','General'],
        faqAnswerText: ['You can select any incompleted order and press on proceed to payment option.'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Is it possible to get the cashback if my order gets stuck?',
        faqCategoryPath: ['Orders','General'],
        faqAnswerText: ['You will receive the refund amount in your bank account within 5-7 working days.'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'What is the stock value of Heranba Industries?',
        faqCategoryPath: ['Products','Heranba Industries','Heranba Industries General'],
        faqAnswerText: ['National Stock Exchange (NSE): Rs 789.75' , 
                        'Bombay Stock Exchange (BSE): Rs 789.50'],
        faqIsDynamic: false, //later will be dynamic to true
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Do you wish to see your current stock holding for Heranba Industries?',
        faqCategoryPath: ['Products','Heranba Industries','Heranba Industries Previous Orders'],
        faqAnswerText: [],
        faqIsDynamic: true,
        faqDynamicAnswer: getCurrentStockHolding,
    },
    {
        faqQuestionText: 'What is the stock value of Vodafone Idea?',
        faqCategoryPath: ['Products','Vodafone Idea','Vodafone Idea General'],
        faqAnswerText: ['National Stock Exchange (NSE): Rs 10.30',
                        'Bombay Stock Exchange (BSE): Rs 10.31'],
        faqIsDynamic: false, //later will be dynamic to true
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Do you wish to see your current stock holding for Vodafone Idea?',
        faqCategoryPath: ['Products','Vodafone Idea','Vodafone Idea Previous Orders'],
        faqAnswerText: [],
        faqIsDynamic: true,
        faqDynamicAnswer: getCurrentStockHolding,
    },
    {
        faqQuestionText: 'What is the annual fund return value of ICICI Prudential Technology Direct Plan Growth?',
        faqCategoryPath: ['Products','ICICI Prudential Technology Direct Plan Growth','ICICI Prudential Technology Direct Plan Growth General'],
        faqAnswerText: ['99.86%'],
        faqIsDynamic: false, //later will be dynamic to true
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Do you want to check whether you have ICICI Prudential Technology Direct Plan Growth compounding?',
        faqCategoryPath: ['Products','ICICI Prudential Technology Direct Plan Growth','ICICI Prudential Technology Direct Plan Growth Previous Orders'],
        faqAnswerText: [],
        faqIsDynamic: true,
        faqDynamicAnswer: checkAvailabilityPreviousOrders //Function required.
    },
    {
        faqQuestionText: 'What is the monthly fund return value of Tata Digital India Fund Direct Growth?',
        faqCategoryPath: ['Products','Tata Digital India Fund Direct Growth','Tata Digital India Fund Direct Growth General'],
        faqAnswerText: ['49.29%'],
        faqIsDynamic: false, //later will be dynamic to true
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Do you want to check whether you have any funds ordered for Tata Digital India Fund Direct Growth?',
        faqCategoryPath: ['Products','Tata Digital India Fund Direct Growth','Tata Digital India Fund Direct Growth Previous Orders'],
        faqAnswerText: [],
        faqIsDynamic: true,
        faqDynamicAnswer: checkAvailabilityPreviousOrders //Function required
    },
    {
        faqQuestionText: 'What is the rate of interest for Equitas 1 Year FD?',
        faqCategoryPath: ['Products','Equitas 1 Year','Equitas 1 Year General'],
        faqAnswerText: ['6.50%'],
        faqIsDynamic: false, //later will be dynamic to true
        faqDynamicAnswer: checkAvailabilityPreviousOrders,
    },
    {
        faqQuestionText: 'Do you want to check whether you have Equitas 1 Year FD running?',
        faqCategoryPath: ['Products','Equitas 1 Year','Equitas 1 Year Previous Orders'],
        faqAnswerText: [],
        faqIsDynamic: true, 
        faqDynamicAnswer: checkAvailabilityPreviousOrders, //Function required
    },
    {
        faqQuestionText: 'What is the premium withdrawal status for Equitas 3 months?',
        faqCategoryPath: ['Products','Equitas 3 Months','Equitas 3 Months General'],
        faqAnswerText: ['Premium withdrawal is available for Equitas 3 Months'],
        faqIsDynamic: false, //later will be dynamic to true
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Do you want to check whether you have ordered Equitas 3 Months previously?',
        faqCategoryPath: ['Products','Equitas 3 Months','Equitas 3 Months Previous Orders'],
        faqAnswerText: [],
        faqIsDynamic: true, 
        faqDynamicAnswer: checkAvailabilityPreviousOrders, //Function required
    },
    {
        faqQuestionText: 'What is the purity value of Groww Digital Gold?',
        faqCategoryPath: ['Products','Augmont Gold','Augmont Gold General'],
        faqAnswerText: ['Groww ensures 99.90% purity for Digital Gold'],
        faqIsDynamic: false,
        faqDynamicAnswer: null,
    },
    {
        faqQuestionText: 'Do you want to check whether you have previously bought gold?',
        faqCategoryPath: ['Products','Augmont Gold','Augmont Gold Previous Orders'],
        faqAnswerText: [],
        faqIsDynamic: true,
        faqDynamicAnswer: checkAvailabilityPreviousOrders, //Function required
    },
]

let productArr = [
    {
        productCategory: 'Stocks',
        productPrice: {
                stockPrice: {
                    nse: '812.60',
                    bse: '812.25',
                },
                fundReturns: {
                    sixMonths: null,
                    oneYear: null,
                    threeYear: null,
                    fiveYear: null,
                    all: null,
                },
                fd: {
                    rateOfInterest: null,
                    minAmount: null,
                    compounding: null,
                    prematureWithdrawal: null,
                },
                purity: null,
        },
        productName: 'Heranba Industries',
        faqId: [],
    },
    {
        productCategory: 'Stocks',
        productPrice: {
                stockPrice: {
                    nse: '10.55',
                    bse: '10.55',
                },
                fundReturns: {
                    sixMonths: null,
                    oneYear: null,
                    threeYear: null,
                    fiveYear: null,
                    all: null,
                },
                fd: {
                    rateOfInterest: null,
                    minAmount: null,
                    compounding: null,
                    prematureWithdrawal: null,
                },
                purity: null,
        },
        productName: 'Vodafone Idea',
        faqId: [],
    },
    {
        productCategory: 'Mutual Funds',
        productPrice: {
                stockPrice: {
                    nse: null,
                    bse: null,
                },
                fundReturns: {
                    sixMonths: '45.04%',
                    oneYear: '81.52%',
                    threeYear: '27.92%',
                    fiveYear: '22.23%',
                    all: '23.90%',
                },
                fd: {
                    rateOfInterest: null,
                    minAmount: null,
                    compounding: null,
                    prematureWithdrawal: null,
                },
                purity: null,
        },
        productName: 'ICICI Prudential Technology Direct Plan Growth',
        faqId: [],
    },
    {
        productCategory: 'Mutual Funds',
        productPrice: {
                stockPrice: {
                    nse: null,
                    bse: null,
                },
                fundReturns: {
                    sixMonths: '46.23%',
                    oneYear: '65.57%',
                    threeYear: '27.98%',
                    fiveYear: '21.92%',
                    all: '21.37%',
                },
                fd: {
                    rateOfInterest: null,
                    minAmount: null,
                    compounding: null,
                    prematureWithdrawal: null,
                },
                purity: null,
        },
        productName: 'Tata Digital India Fund Direct Growth',
        faqId: [],
    },
    {
        productCategory: 'FDs',
        productPrice: {
                stockPrice: {
                    nse: null,
                    bse: null,
                },
                fundReturns: {
                    sixMonths: null,
                    oneYear: null,
                    threeYear: null,
                    fiveYear: null,
                    all: null,
                },
                fd: {
                    rateOfInterest: '6.50%',
                    minAmount: '5000',
                    compounding: 'Quaterly',
                    prematureWithdrawal: 'Available',
                },
                purity: null,
        },
        productName: 'Equitas 1 Year',
        faqId: [],
    },
    {
        productCategory: 'FDs',
        productPrice: {
                stockPrice: {
                    nse: null,
                    bse: null,
                },
                fundReturns: {
                    sixMonths: null,
                    oneYear: null,
                    threeYear: null,
                    fiveYear: null,
                    all: null,
                },
                fd: {
                    rateOfInterest: '4.90%',
                    minAmount: '5000',
                    compounding: 'Quaterly',
                    prematureWithdrawal: 'Available',
                },
                purity: null,
        },
        productName: 'Equitas 3 Months',
        faqId: [],
    },
    {
        productCategory: 'Gold',
        productPrice: {
                stockPrice: {
                    nse: null,
                    bse: null,
                },
                fundReturns: {
                    sixMonths: null,
                    oneYear: null,
                    threeYear: null,
                    fiveYear: null,
                    all: null,
                },
                fd: {
                    rateOfInterest: null,
                    minAmount: null,
                    compounding: null,
                    prematureWithdrawal: null,
                },
                purity: '99.90%',
        },
        productName: 'Augmont Gold',
        faqId: [],
    },
]

let ordersArr = [
    {
        orderStatus: 'Completed',
        orderDate: '21/01/2021',
        category: 'Stocks',
        products: [],//link product ids
        userId: null,//link userId
        faqId: [],
    },
    {
        orderStatus: 'Not completed',
        orderDate: '22/01/2021',
        category: 'Mutual Funds',
        products: [],//link product ids
        userId: null,//link userId
        faqId: [],
    },
    {
        orderStatus: 'Completed',
        orderDate: '01/02/2021',
        category: 'FDs',
        products: [],//link product ids
        userId: null,//link userId
        faqId: [],
    },
]

let userArr = [
    {
        userName: 'alice@gmail.com',
        userPass: 'pAsSwWoRd1!',
        userDOB: '01/01/2001',
        userMob: '999999999',
        userMaritalStatus: 'Married',
        userGender: 'Female',
        userKyc: {
            status: 'Completed',
            documents: {
                pan: 'ABCF4522',
                addressProof: 'London,UK'
            }   
        },
        userOrders: [],
        faqId: [],
    },
    {
        userName: 'bjourn@gmail.com',
        userPass: 'pAsSwWoRd2!',
        userDOB: '01/01/2021',
        userMob: '999999998',
        userMaritalStatus: 'Single',
        userGender: 'Male',
        userKyc: {
            status: 'Not completed',
            documents: {
                pan: 'BGYH3410O',
                addressProof: 'New Delhi,India'
            }   
        },
        userOrders: [],
        faqId: [],
    },
]

exports.faqArr = faqArr;
exports.userArr = userArr;
exports.productArr = productArr;
exports.ordersArr = ordersArr;