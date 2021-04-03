// const {browseSimilarProducts,getCurrentStockHolding,checkAvailabilityPreviousOrders} = require('./dynamic_questions_handler');
let faqArr = [
    {
        faqQuestionText: ['If I verify with TPIN, will it sell all my holdings?',
                          'Why do I have to use TPIN to sell my Stocks'],
        faqCategoryPath: ['Stocks','Demat Account'],
        faqAnswer: [{
                        faqAnswerText: [`No. Once you verify via TPIN by CDSL, it only verifies your existing holdings so that you can place your sell order whenever you want in a secure manner.`,
                                        `The approval is valid for 1 day for your Demat account after which you will require to verify again.`,
                                        `We assure you that no sell order will be placed without your approval.`,
                                        `Use the link below to verify your holdings`,
                                        `https://groww.in/cdslauth`],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    },
                    {
                        faqAnswerText: 
                            [`Effective from 18 Feb 2021, you'll have to enter TPIN and OTP received on your registered mobile number while verifying your holdings before selling. (Validity: 1 day)`],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    }],
    },
    {
        faqQuestionText: ['How will off market transactions show up in my holding?',
                          'When will corporate action reflect in my holdings?'],
        faqCategoryPath: ['Stocks','Holdings'],
        faqAnswer: [{
                        faqAnswerText: 
                            ['Off market transactions will show up in your holdings after it reflects in your demat account.',
                            'It takes 2 working days after the transaction date to show up (T+2).',
                            'Please raise a ticket if it has been more than 2 days.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    },
                    {
                        faqAnswerText:
                            ['It will reflect on the execution date.','After the delivery date it will start reflecting in your holdings.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    }
                ],
    },
    {
        faqQuestionText: ['How to invest in IPO?',
                          'What is IPO?'],
        faqCategoryPath: ['Stocks','IPO'],
        faqAnswer: [{
                        faqAnswerText:
                            [`Here are steps to apply for IPO`,
                            `Visit https://groww.in/ipo`,
                            `You will see the list of open IPOs. Press the 'APPLY' button beside the IPO name you want to apply for.`,
                            `In the box on the right side, enter the number of shares you want to apply for`,
                            `Press the 'CONTINUE' button.`,
                            `Enter your UPI ID. You will get this from your UPI app (Google Pay, PhonePe, etc).`,
                            `Press the 'CONTINUE' button.`,
                            `You will be able to see a timeline of your IPO application process and the tentative allotment date.`,
                            `Within 24 hours, you will get a UPI mandate request on your UPI app. Approve it.`,
                            `Note: The UPI mandate request may come instantly or may take up to 24 hours to come.`,],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    },
                    {
                        faqAnswerText:
                            [`Intial Public Offering (IPO) is the process in which a private company becomes public by selling a portion of its stake to investors.`,
                             `An IPO is generally initiated to infuse new equity capital into the firm, to facilitate easy trading of the existing assets, to raise capital for the future, or to monetize the investments made by existing stakeholders.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    }
                ],
    },
    {
        faqQuestionText: ['What is stocks margin?',
                          'Why is my intraday profit amount blocked'],
        faqCategoryPath: [`Stocks`,`Margin`],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`Margin is the money you borrow from Groww (broker) to trade in stocks.`,
                            `With the margin feature on Groww, you are able to buy stocks for as low as 15% of the total value of the stock.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    },
                    {
                        faqAnswerText:
                            [`The intraday buy-sell profit amount has been blocked as per SEBI regulations, which will be released on the next market session (T+1) after the market closes.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    },
                ],
    },
    {
        faqQuestionText: ['What are account maintainance charges?',
                          'What are account opening charges?'],
        faqCategoryPath: ['Stocks','Charges'],
        faqAnswer: [{
                        faqAnswerText:
                            ['This is Rs 0 on Groww.',
                            'Most platforms charge an annual maintenance charge (AMC) for the demat account.',
                            'On Groww, we do not have any AMC.',
                            'Go to the link below to view pricing on stocks.',
                            'https://groww.in/pricing/stocks'],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    },
                    {
                        faqAnswerText:
                            ['Currently opening a stocks account is completely free on Groww.',
                             'This may change in the near future. However, any change in account opening charge will be notified to all our users before implementing that update.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    }
                ],
    },
    {
        faqQuestionText: ['How can I access my stocks P&L report?',
                          'I did not get my report till now. When will I get it ?'],
        faqCategoryPath: ['Stocks','P&L Reports'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            ['You can request your stocks P&L report in the Reports section.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    },
                    {
                        faqAnswerText:
                            ['It takes up to 24 hours for the report to be generated.',
                            'If it has been more than 24 hours, please raise a ticket and reach out to us.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    }
                ],
    },
    {
        faqQuestionText: ['How much does Groww charge for stocks?',
                          'Is there any rule for limit price of an order?'],
        faqCategoryPath: ['Stocks','Others'],
        faqAnswer: [
                    {
                        faqAnswerText:    
                            [`Account opening=Rs 0`,
                            `Annual maintenance charge (AMC) = Rs 0`,
                            `Brokerage = Rs 20 or 0.05% per order (whichever is lower)`,
                            `Regulatory & statutory charges, penalties, and GST is extra and depends on the type of order.`,
                            `You can use the brokerage calculator to get an estimate of all the charges involved.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    },
                    {
                        faqAnswerText:
                            [`As per exchange guidelines, you can buy or sell a stock within a certain range.`,
                            `This range is displayed to you when you're placing a buy or sell limit order.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    }
                ],
    },
    {
        faqQuestionText: ['How to start a SIP on Groww?',
                          'How to change SIP date or amount'],
        faqCategoryPath: ['Mutual Funds','My SIPs'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`Visit https://groww.in/mutual-funds/filter.`,
                            `Search or choose a mutual fund.`,
                            `Choose 'Monthly SIP'`,
                            `Enter the amount to invest`,
                            `Pay via UPI/Netbanking/NEFT`,
                            `Don't forget to add Biller/OTM/AutoPay for future installments.`,
                            `Visit the link below to learn more about choosing mutual funds`,
                            `https://groww.in/blog/how-to-choose-mutual-funds-in-india/`],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    },
                    {
                        faqAnswerText:
                            [`TO CHANGE THE SIP DATE:`,
                             `Cancel the existing SIP.`,
                             `Start a new SIP with the new date.`,
                             `TO CHANGE THE SIP AMOUNT:`,
                             `Cancel the existing SIP.`,
                             `Start a new SIP the new SIP amount.`
                            ],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    }
                ],
    },
    {
        faqQuestionText: ['How do I pay for a missed installment?',
                          'What is AutoPay via Biller?'],
        faqCategoryPath: ['Mutual Funds','AutoPay'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`Go to MY SIPS.`,
                            `Beside the mutual fund's name, you will see 'Invest' written. Click on it.`,
                            `Enter the amount and choose 'One-Time'`,
                            `Complete the payment.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    },
                    {
                        faqAnswerText:
                            [`AutoPay is an authorization to debit the monthly SIP amount from your bank account.`,
                             `This authorization is required only once and takes about 7 working days to be approved by your bank.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    },
                ],
    },
    {
        faqQuestionText: ['How do I import my external mutual fund investments',
                          `What can I do with my external funds`],
        faqCategoryPath: ['Mutual Funds','Import Funds'],
        faqAnswer: [
                    {
                        faqAnswerText:        
                            [`Visit https://groww.in/track/request`,
                            `Tap on 'Connect with Google'.`,
                            `Choose the email ID in which you receive statements of your external mutual funds.`,
                            `Continue on with the next steps.`,
                            `Give permission to Groww to read your email. In 1-2 days, you will be able to see your external investments on the dashboard. Your imported investments will be updated every 30 days.`,
                            `Note: Groww does not have access to any of your emails except the ones that come from fonotreply@camsonline.com and samfS@kfintech.com. Groww can only read messages that are from CAMS and Karvy so as to be able to read the mutual funds statements.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    },
                    {
                        faqAnswerText:
                            [`Once your external funds have been imported to Groww, you can easily invest more, redeem, and start SIP in that fund. If your external funds are regular plan funds, you can even switch them to direct plan(zero-commission).`],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    }
                ],
    },
    {
        faqQuestionText: ['What is Digital Gold?',
                          'What is Gold Locker?'],
        faqCategoryPath: ['Gold','About Digital Gold'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            ['Digital Gold is a convenient and cost-effective way of purchasing gold online.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    },
                    {
                        faqAnswerText:
                            ['Gold Locker is a digital version of your holdings, wherein you can view your Digital Gold transactions.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    }
                ],
    },
    {
        faqQuestionText: ['How do I buy Digital Gold on Groww?',
                          'How can I pay for Digital Gold purchase?'],
        faqCategoryPath: ['Gold','Buying Gold'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`Enter the amount. You can input your desired purchase amount in rupees or grams of gold.`,
                            `Buy in one-click: Review your order to make quick payment within the 5-minute price window.`,
                            `Secured and insured: Your gold locker will be updated, where you can view your purchased Digital Gold holdings.`,
                            `Visit the link below to login and buy gold.`,
                            `https://groww.in/dashboard/explore/stocks`],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    },
                    {
                        faqAnswerText:
                            ['You can pay easily via UPI/Net banking.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    }
                ],
    },
    {
        faqQuestionText: ['How do I sell Digital Gold purchased on Groww?',
                          'How soon can I sell the Digital Gold bought on Groww?'],
        faqCategoryPath: ['Gold','Selling Gold'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`Digital Gold purchased on Groww can be sold back to Augmont anytime after the 2-day holding period from the date of purchase.`,
                            `Click on the sell tab: Enter units to sell at the current selling price shown.`,
                            `Sell in one-click: Review and place your sell request within the 5-minute price window.`,
                            `Request confirmed: Your gold locker will be updated, where you can view your Digital Gold balance.`,
                            `You will receive the amount in your chosen bank account within 2 working days.`,
                            `Visit the link below to check your gold.`,
                            `https://groww.in/dashboard/investments/gold`],
                        faqIsDynamic: false,
                        faqDynamicKey: '' 
                    },
                ],
    },
    {
        faqQuestionText: ['How is the storage of physical gold taking place?',
                          'What will happen to my gold if Augmont/Bullion India goes into liquidation?'],
        faqCategoryPath: ['Gold','Gold Storage & Insurance'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`The physical gold is stored by Augmont in 100% secured Sequel's vaults and insured (verified by an IDBI Trusteeship Service Pvt. Ltd. - an independent trustee).`],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    },
                    {
                        faqAnswerText:
                            [`Your gold assets are independent of the other assets of Bullion India.`,
                             `IDBI Trusteeship Services Pvt. Ltd. (appointed by Bullion India) acts as an independent trustee, who will ensure that the interests of the customers are protected.`,
                             `The trustee has sole and exclusive charge of the customer's gold held in the vault. Thus, in the event of any adverse effect to Bullion India, it should not effect the customer's gold assets.`
                            ],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    }
                ],
    },
    {
        faqQuestionText: ['How many fixed deposits can I open?',
                          'What is the minimum/maximum tenure for opening a fixed deposit?'],
        faqCategoryPath: ['FDs','About FDs'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            ['If your KYC is verified, you can open as many fixed deposits as you wish. However, till your KYC is under process, you can place only one order for opening a fixed deposit.'],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    },
                    {
                        faqAnswerText:
                            ['You can choose any tenure between 7 days and 10 years. It also depends on the products offered by the bank.'],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    }
                ],
    },
    {
        faqQuestionText: ['Why did my fixed deposit investment fail?',
                          'How do I track my FD transaction?'],
        faqCategoryPath: ['FDs','FD Orders'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`Your fixed deposit investment may fail due to incorrect/mismatched data in the KYC documents submitted resulting in KYC rejection or due to payment issues while booking the fixed deposit`,
                            `Please re-upload your documents or retry making the payment.`,
                            `If this is a recurring issue, please raise a ticket. We'll resolve this issue as soon as possible.`],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    },
                    {
                        faqAnswerText:
                            [`Move to orders page for fixed deposits on the Groww website.`,
                             `Note: If the amount has been deducted from your account but is not reflecting then it will be refunded back to your account in 2-3 working days.`
                            ],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    }
                ],
    },
    {
        faqQuestionText: ['How to get a TDS certificate for my fixed deposit?',
                          'What is the tax implication on FD?'],
        faqCategoryPath: ['FDs','Taxation'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`You can download the TDS certificate from the bank's website/app via net banking.`],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    },
                    {
                        faqAnswerText:
                            [`TDS of 10% is deducted by the bank if the annual interest earned is more than Rs 40000 or Rs 50000 in case of senior citizens.`],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    }
                ],
    },
    {
        faqQuestionText: ['Can I withdraw my fixed deposit before maturity?',
                          'Can I withdraw tax-saver deposits as they have a lock-in period of 5 years (minimum).'],
        faqCategoryPath: ['FDs','Withdrawal'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`Premature withdrawal of fixed deposits is not allowed for tax-saver deposits and monthly interest payout deposits.`,
                            `Any other type of fixed deposit can be withdrawn before maturity.`,
                            `Please refer to the 'FD Details' section of any fixed deposit for premature penalty information.`],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    },
                    {
                        faqAnswerText:
                            [`No, you can't withdraw tax-saver deposits as they have a lock-in period of 5 years (minimum).`],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    }
                ],
    },
    {
        faqQuestionText: ['How to change email address?',
                          'How to change name on Groww?'],
        faqCategoryPath: ['My Account','Groww Account'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            ['Please raise a ticket. We will help you with this matter.',
                            'Visit the link below to raise a ticket and address the issue.',
                            'https://groww.in/user/help/tickets/create'],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    },
                    {
                        faqAnswerText:
                            ['Please raise a ticket. We will help you with this matter.'],
                        faqIsDynamic: false,
                        faqDynamicKey: ''
                    }
                ],
    },
    {
        faqQuestionText: ['What are the documents required for getting my full KYC done?',
                          'Do you charge for processing KYC?',
                          'How long does it take to modify my KYC',
                          'How to complete my account?'
                        ],
        faqCategoryPath: ['My Account','KYC'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`You will need to upload the following`,
                            `Photo of PAN card`,
                            `Address proof (DL, Aadhar, Voter's ID)`,
                            `Photo of signature`,
                            `Passport size photo and`,
                            `Short 5 sec video of you holding your PAN card`,
                            `Visit the link below to proceed with uploading your documents.`,
                            `https://groww.in/onboarding/upload`],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    },
                    {
                        faqAnswerText:
                            ['No. We do not charge anything for processing your KYC. We do it for free along with your first investment.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    },
                    {
                        faqAnswerText:
                            ['Once you have submitted the documents, it takes around 2-3 weeks to modify your KYC.',
                             'This time to process is taken by the central KYC registry.',
                             'If it has been already been 3 weeks since you submitted the documents, please contact us.'
                            ],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    },
                    {
                        faqAnswerText:
                            ['You can complete your account by raising the ticket and inform us in details.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    },
                ],
    },
    {
        faqQuestionText: ['Can I invest using a credit/debit card?',
                          'Why do I need to add a bank account?'],
        faqCategoryPath: ['My Account','Bank Accounts'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`No, it is not possible to invest using credit/debit card on Groww.`,
                            `SEBI rules say the investments should be made through verified bank accounts only.`,
                            `It is not possible to verify bank accounts when investments are made using a credit/debit card.`,
                            `You can use the either UPI apps (Google Pay,PhonePe,BHIM,etc), Net banking or NEFT/RTGS/IMPS`],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    },
                    {
                        faqAnswerText:
                            [`Wihout adding a bank account, it is not possible to invest.`,
                             `As per government rules, money invested in mutual funds should be linked to a bank account so that it can be withdrawn and paid back.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    },
                ],
    },
    {
        faqQuestionText: ['How to add money for Groww Balance?',
                          `Why am I unable to withdraw the amount in 'Available to Invest'`],
        faqCategoryPath: ['My Account','Payments'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [`Here's how you can add money to your Groww Balance`,
                            `Visit https://groww.in/user/balance/inr`,
                            `Tap on the button 'Add Money'`,
                            `Enter the amount you want to invest and tap 'Add Money'`,
                            `Then,complete the payment.`,
                            `The money will show in your Groww Balance.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    },
                    {
                        faqAnswerText:
                            [`Any amount added to Groww is 'Available to invest' immediately. However, this amount will be 'Available to Withdraw' only after 1 working day.`],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    }
                ],
    },
    {
        faqQuestionText: ['Browse similar products?',
                          'How to cancel an order?'],
        faqCategoryPath: ['Orders','Completed'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            [''],
                        faqIsDynamic: true,
                        faqDynamicKey: 'browseSimilarProducts',
                    },
                    {
                        faqAnswerText:
                            ['You cancel your order by moving to individual orders page, click on cancel and press ok to confirm cancel your order.',
                            'Note: You cannot replace the same order after you cancel a particular order.',],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    }
                ],
    },
    {
        faqQuestionText: ['Is there a penalty for cancellation?',
                          'How long does cancellation take?'],
        faqCategoryPath: ['Orders','Cancelled'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            ['No there is no penalty for order cancellation.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    },
                    {
                        faqAnswerText:
                            ['Cancellation may take upto 6-7 hours after confirming cancel within 30 minutes of placing order.',
                            'For specific queries raise a ticket.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    }
                ],
    },
    {
        faqQuestionText: ['How to place a pending order?',
                          'Can I cancel a pending order?'],
        faqCategoryPath: ['Orders','Pending'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            ['Move to your specific order page which is in pending status.',
                            'Press complete order.',
                            'Complete the payment and place your order',
                            'If your order is still in pending status, raise a ticket.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    },
                    {
                        faqAnswerText:
                            ['You can cancel a pending order by moving to the orders page and press on cancel and ok to confirm'],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    }
                ],
    },
    {
        faqQuestionText: ['How to do the payment of an order?',
                          'Is it possible to get the cashback if my order gets stuck?'],
        faqCategoryPath: ['Orders','General'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            ['You can select any pending order and press on proceed to payment option.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    },
                    {
                        faqAnswerText:
                            ['You will receive the refund amount in your bank account within 5-7 working days.'],
                        faqIsDynamic: false,
                        faqDynamicKey: '', 
                    }
                ],
    },
    {
        faqQuestionText: ['What is the stock value of Heranba Industries?',],
        faqCategoryPath: ['Products','Heranba Industries','Heranba Industries General'],
        faqAnswer: [
                    {
                        faqAnswerText:
                            ['National Stock Exchange (NSE): Rs 789.75' , 
                            'Bombay Stock Exchange (BSE): Rs 789.50'],
                        faqIsDynamic: false, //later will be dynamic to true
                        faqDynamicKey: '',
                    },
                ],
    },
    {
        faqQuestionText: ['Do you wish to see your current stock holding for Heranba Industries?'],
        faqCategoryPath: ['Products','Heranba Industries','Heranba Industries Previous Orders'],
        faqAnswer: [
                    {
                        faqAnswerText: [],
                        faqIsDynamic: true,
                        faqDynamicKey: 'getCurrentStockHolding',
                    },
                ]
    },
    {
        faqQuestionText: ['What is the stock value of Vodafone Idea?'],
        faqCategoryPath: ['Products','Vodafone Idea','Vodafone Idea General'],
        faqAnswer: [
                    {
                        faqAnswerText: ['National Stock Exchange (NSE): Rs 10.30',
                                        'Bombay Stock Exchange (BSE): Rs 10.31'],
                        faqIsDynamic: false, //later will be dynamic to true
                        faqDynamicKey: '',
                    },
                ],
    },
    {
        faqQuestionText: ['Do you wish to see your current stock holding for Vodafone Idea?'],
        faqCategoryPath: ['Products','Vodafone Idea','Vodafone Idea Previous Orders'],
        faqAnswer: [
                    {
                        faqAnswerText: [],
                        faqIsDynamic: true,
                        faqDynamicKey: 'getCurrentStockHolding',
                    },
                ],
    },
    {
        faqQuestionText: ['What is the annual fund return value of ICICI Prudential Technology Direct Plan Growth?'],
        faqCategoryPath: ['Products','ICICI Prudential Technology Direct Plan Growth','ICICI Prudential Technology Direct Plan Growth General'],
        faqAnswer: [
                    {
                        faqAnswerText: ['99.86%'],
                        faqIsDynamic: false, //later will be dynamic to true
                        faqDynamicKey: '',
                    }
                ],
    },
    {
        faqQuestionText: ['Do you want to check whether you have ICICI Prudential Technology Direct Plan Growth compounding?'],
        faqCategoryPath: ['Products','ICICI Prudential Technology Direct Plan Growth','ICICI Prudential Technology Direct Plan Growth Previous Orders'],
        faqAnswer: [
                    {
                        faqAnswerText: [],
                        faqIsDynamic: true,
                        faqDynamicKey: 'checkAvailabilityPreviousOrders'    
                    }
                ],
    },
    {
        faqQuestionText: ['What is the monthly fund return value of Tata Digital India Fund Direct Growth?'],
        faqCategoryPath: ['Products','Tata Digital India Fund Direct Growth','Tata Digital India Fund Direct Growth General'],
        faqAnswer: [
                    {
                        faqAnswerText: ['49.29%'],
                        faqIsDynamic: false, //later will be dynamic to true
                        faqDynamicKey: '',            
                    }
                ],
    },
    {
        faqQuestionText: ['Do you want to check whether you have any funds ordered for Tata Digital India Fund Direct Growth?'],
        faqCategoryPath: ['Products','Tata Digital India Fund Direct Growth','Tata Digital India Fund Direct Growth Previous Orders'],
        faqAnswer: [
                    {
                        faqAnswerText: [],
                        faqIsDynamic: true,
                        faqDynamicKey: 'checkAvailabilityPreviousOrders'            
                    }
                ],
    },
    {
        faqQuestionText: ['What is the rate of interest for Equitas 1 Year FD?'],
        faqCategoryPath: ['Products','Equitas 1 Year','Equitas 1 Year General'],
        faqAnswer: [
                    {
                        faqAnswerText: ['6.50%'],
                        faqIsDynamic: false, //later will be dynamic to true
                        faqDynamicKey: '',
                    }
                ],
    },
    {
        faqQuestionText: ['Do you want to check whether you have Equitas 1 Year FD running?'],
        faqCategoryPath: ['Products','Equitas 1 Year','Equitas 1 Year Previous Orders'],
        faqAnswer: [
                    {
                        faqAnswerText: [],
                        faqIsDynamic: true, 
                        faqDynamicKey: 'checkAvailabilityPreviousOrders',
                    }
                ],
    },
    {
        faqQuestionText: ['What is the premium withdrawal status for Equitas 3 months?'],
        faqCategoryPath: ['Products','Equitas 3 Months','Equitas 3 Months General'],
        faqAnswer: [
                    {
                        faqAnswerText: ['Premium withdrawal is available for Equitas 3 Months'],
                        faqIsDynamic: false, //later will be dynamic to true
                        faqDynamicKey: '',
                    }
                ],
    },
    {
        faqQuestionText: ['Do you want to check whether you have ordered Equitas 3 Months previously?'],
        faqCategoryPath: ['Products','Equitas 3 Months','Equitas 3 Months Previous Orders'],
        faqAnswer: [
                    {
                        faqAnswerText: [],
                        faqIsDynamic: true, 
                        faqDynamicKey: 'checkAvailabilityPreviousOrders',
                    }
                ],
    },
    {
        faqQuestionText: ['What is the purity value of Groww Digital Gold?'],
        faqCategoryPath: ['Products','Augmont Gold','Augmont Gold General'],
        faqAnswer: [
                    {
                        faqAnswerText: ['Groww ensures 99.90% purity for Digital Gold'],
                        faqIsDynamic: false,
                        faqDynamicKey: '',
                    }
                ],
    },
    {
        faqQuestionText: ['Do you want to check whether you have previously bought gold?'],
        faqCategoryPath: ['Products','Augmont Gold','Augmont Gold Previous Orders'],
        faqAnswer: [
                    {
                        faqAnswerText: [],
                        faqIsDynamic: true,
                        faqDynamicKey: 'checkAvailabilityPreviousOrders',
                    }
                ],
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
        orderStatus: 'Completed',
        orderDate: '22/01/2021',
        category: 'Mutual Funds',
        products: [],//link product ids
        userId: null,//link userId
        faqId: [],
    },
    {
        orderStatus: 'Pending',
        orderDate: '23/01/2021',
        category: 'Gold',
        products: [],//link product ids
        userId: null,//link userId
        faqId: [],
    },
    {
        orderStatus: 'Pending',
        orderDate: '24/01/2021',
        category: 'Stocks',
        products: [],//link product ids
        userId: null,//link userId
        faqId: [],
    },
    {
        orderStatus: 'Cancelled',
        orderDate: '24/02/2021',
        category: 'FDs',
        products: [],//link product ids
        userId: null,//link userId
        faqId: [],
    },
    {
        orderStatus: 'Cancelled',
        orderDate: '25/02/2021',
        category: 'FDs',
        products: [],//link product ids
        userId: null,//link userId
        faqId: [],
    },
    {
        orderStatus: 'Cancelled',
        orderDate: '25/02/2021',
        category: 'Mutual Funds',
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