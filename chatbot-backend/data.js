let faqArr = [
    {
        faqQuestionText: 'If I verify with TPIN, will it sell all my holdings?',
        faqQuestionCategory: 'Stocks',
        faqQuestionSubCategoryL1: 'Demat Account',
        faqAnswerText: 'No. Once you verify via TPIN by CDSL, it only verifies your existing holdings so that you can place your sell order whenever you want in a secure manner. The approval is valid for 1 day for your Demat account after which you will require to verify again. We assure you that no sell order will be placed without your approval. Use the link to verify your holdings: https://groww.in/cdslauth',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How will off market transactions show up in my holding?',
        faqQuestionCategory: 'Stocks',
        faqQuestionSubCategoryL1: 'Holdings',
        faqAnswerText: 'Off market transactions will show up in your holdings after it reflects in your demat account. It takes 2 working days after the transaction date to show up (T+2). Please raise a ticket if it has been more than 2 days.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How to invest in IPO?',
        faqQuestionCategory: 'Stocks',
        faqQuestionSubCategoryL1: 'IPO',
        faqAnswerText: `Here are steps to apply for IPO:
                        1. Press the 'INVEST IN IPO' button below.
                        2. You will see the list of open IPOs. Press the 'APPLY' button beside the IPO name you want to apply for.
                        3. In the box on the right side, enter the number of shares you want to apply for.
                        4. Press the 'CONTINUE' button.
                        5. Enter your UPI ID. You will get this from your UPI app (Google Pay, PhonePe, etc).
                        6. Press the 'CONTINUE' button.
                        7. You will be able to see a timeline of your IPO application process and the tentative allotment date.
                        8. Within 24 hours, you will get a UPI mandate request on your UPI app. Approve it.

                        DONE!

                        Note: The UPI mandate request may come instantly or may take up to 24 hours to come.
                        Go to https://groww.in/ipo to invest in IPO.`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'What is stocks margin?',
        faqQuestionCategory: 'Stocks',
        faqQuestionSubCategoryL1: 'Margin',
        faqAnswerText: 'Margin is the money you borrow from Groww (broker) to trade in stocks. With the margin feature on Groww, you are able to buy stocks for as low as 15% of the total value of the stock.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'What are account maintainance charges?',
        faqQuestionCategory: 'Stocks',
        faqQuestionSubCategoryL1: 'Charges',
        faqAnswerText: 'This is Rs 0 on Groww. Most platforms charge an annual maintenance charge (AMC) for the demat account. On Groww, we do not have any AMC. Go to https://groww.in/pricing/stocks to view pricing on stocks.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How can I access my stocks P&L report?',
        faqQuestionCategory: 'Stocks',
        faqQuestionSubCategoryL1: 'P&L Reports',
        faqAnswerText: 'You can request your stocks P&L report in the Reports section.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How much does Groww charge for stocks?',
        faqQuestionCategory: 'Stocks',
        faqQuestionSubCategoryL1: 'Others',
        faqAnswerText: `Account opening=Rs 0
                        Annual maintenance charge (AMC) = Rs 0
                        Brokerage = Rs 20 or 0.05% per order (whichever is lower)
                        Regulatory & statutory charges, penalties, and GST is extra and depends on the type of order.
                        You can use the brokerage calculator to get an estimate of all the charges involved.`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How to start a SIP on Groww?',
        faqQuestionCategory: 'Mutual Funds',
        faqQuestionSubCategoryL1: 'My SIPs',
        faqAnswerText: `1. Click 'Explore Mutual Funds' button below.
                        2. Search or choose a mutual fund.
                        3. Choose 'Monthly SIP'
                        4. Enter the amount to invest
                        5. Pay via UPI/Netbanking/NEFT
                        6. Don't forget to add Biller/OTM/AutoPay for future installments.
                        To learn more about choosing mutual funds,visit https://groww.in/blog/how-to-choose-mutual-funds-in-india/`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How do I pay for a missed installment?',
        faqQuestionCategory: 'Mutual Funds',
        faqQuestionSubCategoryL1: 'AutoPay',
        faqAnswerText: `1. Go to MY SIPS.
                        2. Beside the mutual fund's name, you will see 'Invest' written. Click on it.
                        3. Enter the amount and choose 'One-Time'
                        4. Complete the payment.`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How do I import my external mutual fund investments',
        faqQuestionCategory: 'Mutual Funds',
        faqQuestionSubCategoryL1: 'Import Funds',
        faqAnswerText: `1. Visit https://groww.in/track/request
                        2. Tap on 'Connect with Google'.
                        3. Choose the email ID in which you receive statements of your external mutual funds.
                        4. Continue on with the next steps.
                        Give permission to Groww to read your email. In 1-2 days, you will be able to see your external investments on the dashboard. Your imported investments will be updated every 30 days.
                        Note: Groww does not have access to any of your emails except the ones that come from fonotreply@camsonline.com and samfS@kfintech.com. Groww can only read messages that are from CAMS and Karvy so as to be able to read the mutual funds statements.`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'What is Digital Gold?',
        faqQuestionCategory: 'Gold',
        faqQuestionSubCategoryL1: 'About Digital Gold',
        faqAnswerText: 'Digital Gold is a convenient and cost-effective way of purchasing gold online.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How do I buy Digital Gold on Groww?',
        faqQuestionCategory: 'Gold',
        faqQuestionSubCategoryL1: 'Buying Gold',
        faqAnswerText: `1. Enter the amount. You can input your desired purchase amount in rupees or grams of gold.
                        2. Buy in one-click: Review your order to make quick payment within the 5-minute price window.
                        3. Secured and insured: Your gold locker will be updated, where you can view your purchased Digital Gold holdings. Visit https://groww.in/dashboard/explore/stocks to login and buy gold.`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How do I sell Digital Gold purchased on Groww?',
        faqQuestionCategory: 'Gold',
        faqQuestionSubCategoryL1: 'Selling Gold',
        faqAnswerText: `Digital Gold purchased on Groww can be sold back to Augmont anytime after the 2-day holding period from the date of purchase.
                        1. Click on the sell tab: Enter units to sell at the current selling price shown.
                        2. Sell in one-click: Review and place your sell request within the 5-minute price window.
                        3. Request confirmed: Your gold locker will be updated, where you can view your Digital Gold balance.
                        You will receive the amount in your chosen bank account within 2 working days. Visit https://groww.in/dashboard/investments/gold to check your gold.`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How is the storage of physical gold taking place?',
        faqQuestionCategory: 'Gold',
        faqQuestionSubCategoryL1: 'Gold Storage & Insurance',
        faqAnswerText: `The physical gold is stored by Augmont in 100% secured Sequel's vaults and insured (verified by an IDBI Trusteeship Service Pvt. Ltd. - an independent trustee).`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How many fixed deposits can I open?',
        faqQuestionCategory: 'FDs',
        faqQuestionSubCategoryL1: 'About FDs',
        faqAnswerText: 'If your KYC is verified, you can open as many fixed deposits as you wish. However, till your KYC is under process, you can place only one order for opening a fixed deposit.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'Why did my fixed deposit investment fail?',
        faqQuestionCategory: 'FDs',
        faqQuestionSubCategoryL1: 'Orders',
        faqAnswerText: `Your fixed deposit investment may fail due to:
                        1. Incorrect/mismatched data in the KYC documents submitted resulting in KYC rejection
                        2. Payment issues while booking the fixed deposit
                        Please re-upload your documents or retry making the payment.
                        If this is a recurring issue, please raise a ticket. We'll resolve this issue as soon as possible.`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How to get a TDS certificate for my fixed deposit?',
        faqQuestionCategory: 'FDs',
        faqQuestionSubCategoryL1: 'Taxation',
        faqAnswerText: `You can download the TDS certificate from the bank's website/app via net banking.`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'Can I withdraw my fixed deposit before maturity?',
        faqQuestionCategory: 'FDs',
        faqQuestionSubCategoryL1: 'Withdrawal',
        faqAnswerText: `Premature withdrawal of fixed deposits is not allowed for tax-saver deposits and monthly interest payout deposits.Any other type of fixed deposit can be withdrawn before maturity. Please refer to the 'FD Details' section of any fixed deposit for premature penalty information.`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How to change email address?',
        faqQuestionCategory: 'My Account',
        faqQuestionSubCategoryL1: 'Groww Account',
        faqAnswerText: 'Please raise a ticket. We will help you with this matter.Visit https://groww.in/user/help/tickets/create to raise a ticket and address the issue.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'What are the documents required for getting my full KYC done?',
        faqQuestionCategory: 'My Account',
        faqQuestionSubCategoryL1: 'KYC',
        faqAnswerText: `You will need to upload the following
                        1. Photo of PAN card
                        2. Address proof (DL, Aadhar, Voter's ID)
                        3. Photo of signature
                        4. Passport size photo
                        5. Short 5 sec video of you holding your PAN card.
                        Visit https://groww.in/onboarding/upload to proceed with uploading your documents.`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'Can I invest using a credit/debit card?',
        faqQuestionCategory: 'My Account',
        faqQuestionSubCategoryL1: 'Bank Accounts',
        faqAnswerText: `No, it is not possible to invest using credit/debit card on Groww. SEBI rules say the investments should be made through verified bank accounts only. It is not possible to verify bank accounts when investments are made using a credit/debit card.You can use the following options:
                        1. UPI apps (Google Pay,PhonePe,BHIM,etc)
                        2. Net banking
                        3. NEFT/RTGS/IMPS`,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How to add money for Groww Balance?',
        faqQuestionCategory: 'My Account',
        faqQuestionSubCategoryL1: 'Payments',
        faqAnswerText: `Here's how you can add money to your Groww Balance:
                        1.Visit https://groww.in/user/balance/inr
                        2.Tap on the button 'Add Money'
                        3.Enter the amount you want to invest and tap 'Add Money'
                        4.Then,complete the payment.
                        The money will show in your Groww Balance. `,
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'Browse similar products?',
        faqQuestionCategory: 'Orders',
        faqQuestionSubCategoryL1: 'Completed',
        faqAnswerText: '',
        faqIsDynamic: true
    },
    {
        faqQuestionText: 'How to cancel an order?',
        faqQuestionCategory: 'Orders',
        faqQuestionSubCategoryL1: 'Completed',
        faqAnswerText: 'You can cancel the order before it goes in closed status.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'Is there a penalty for cancellation?',
        faqQuestionCategory: 'Orders',
        faqQuestionSubCategoryL1: 'Completed',
        faqAnswerText: 'No there is no penalty for order cancellation.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How to place a buy order?',
        faqQuestionCategory: 'Orders',
        faqQuestionSubCategoryL1: 'Not completed',
        faqAnswerText: 'Move to a specific category,select your product and press on buy.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How to place a redeem order?',
        faqQuestionCategory: 'Orders',
        faqQuestionSubCategoryL1: 'Not completed',
        faqAnswerText: 'Visit https://groww.in/blog/mutual-fund-redemption-what-is-it-and-how-to-redeem-fund-units/',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'How to do the payment of an order?',
        faqQuestionCategory: 'Orders',
        faqQuestionSubCategoryL1: 'General',
        faqAnswerText: 'You can select any incompleted order and press on proceed to payment option.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'Is it possible to get the cashback if my order gets stuck?',
        faqQuestionCategory: 'Orders',
        faqQuestionSubCategoryL1: 'General',
        faqAnswerText: 'You will receive the refund amount in your bank account within 5-7 working days.',
        faqIsDynamic: false
    },
    {
        faqQuestionText: 'What is the stock value of Heranba Industries?',
        faqQuestionCategory: 'Products',
        faqQuestionSubCategoryL1: 'Heranba Industries',
        faqAnswerText: 'NSE: Rs 789.75 , BSE: Rs 789.50',
        faqIsDynamic: false //later will be dynamic to true
    },
    {
        faqQuestionText: 'What is the stock value of Vodafone Idea?',
        faqQuestionCategory: 'Products',
        faqQuestionSubCategoryL1: 'Vodafone Idea',
        faqAnswerText: 'NSE: Rs 10.30 , BSE: Rs 10.31',
        faqIsDynamic: false //later will be dynamic to true
    },
    {
        faqQuestionText: 'What is the annual fund return value of ICICI Prudential Technology Direct Plan Growth?',
        faqQuestionCategory: 'Products',
        faqQuestionSubCategoryL1: 'ICICI Prudential Technology Direct Plan Growth',
        faqAnswerText: '99.86%',
        faqIsDynamic: false //later will be dynamic to true
    },
    {
        faqQuestionText: 'What is the monthly fund return value of Tata Digital India Fund Direct Growth?',
        faqQuestionCategory: 'Products',
        faqQuestionSubCategoryL1: 'Tata Digital India Fund Direct Growth',
        faqAnswerText: '49.29%',
        faqIsDynamic: false //later will be dynamic to true
    },
    {
        faqQuestionText: 'What is the rate of interest for Equitas 1 Year FD?',
        faqQuestionCategory: 'Products',
        faqQuestionSubCategoryL1: 'Equitas 1 Year',
        faqAnswerText: '6.50%',
        faqIsDynamic: false //later will be dynamic to true
    },
    {
        faqAuestionText: 'What is the premium withdrawal status for Equitas 3 months?',
        faqQuestionCategory: 'Products',
        faqQuestionSubCategoryL1: 'Equitas 3 Months',
        faqAnswerText: 'Premium withdrawal is available for Equitas 3 Months',
        faqIsDynamic: false //later will be dynamic to true
    },
    {
        faqQuestionText: 'What is the purity value of Groww Digital Gold?',
        faqQuestionCategory: 'Products',
        faqQuestionSubCategoryL1: 'Augmont Gold',
        faqAnswerText: 'Groww ensures 99.90% purity for Digital Gold',
        faqIsDynamic: false
    },
]

let productArr = [
    {
        productCategory: 'Stocks',
        productPrice: {
                nse: '812.60',
                bse: '812.25',
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
                nse: '10.55',
                bse: '10.55',
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
                nse: null,
                bse: null,
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
                nse: null,
                bse: null,
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
                nse: null,
                bse: null,
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
                nse: null,
                bse: null,
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
                nse: null,
                bse: null,
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