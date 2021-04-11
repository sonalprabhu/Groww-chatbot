//Contains all the data dump used to populate database for checking procedures and API testing
let faqArr = [
    {
        faqQuestionAnswer: [
            {
                faqQuestion: 'If I verify with TPIN, will it sell all my holdings?',
                faqAnswer: [
                    {
                        faqAnswerText: `No. Once you verify via TPIN by CDSL, it only verifies your existing holdings so that you can place your sell order whenever you want in a secure manner.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `The approval is valid for 1 day for your Demat account after which you will require to verify again.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `We assure you that no sell order will be placed without your approval.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Use the link below to verify your holdings`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `https://groww.in/cdslauth`,
                        faqAnswerType: 'link'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: 'Why do I have to use TPIN to sell my Stocks',
                faqAnswer: [
                    {
                        faqAnswerText: `Effective from 18 Feb 2021, you'll have to enter TPIN and OTP received on your registered mobile number while verifying your holdings before selling. (Validity: 1 day)`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Demat Account'
        //faqCategoryPath: ['Stocks','Demat Account']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: 'How will off market transactions show up in my holding?',
                faqAnswer: [
                    {
                        faqAnswerText: `Off market transactions will show up in your holdings after it reflects in your demat account.`,
                        faqAnswerType: 'text',
                    },
                    {
                        faqAnswerText: `It takes 2 working days after the transaction date to show up (T+2).`,
                        faqAnswerType: 'text',
                    },
                    {
                        faqAnswerText: `Please raise a ticket if it has been more than 2 days.`,
                        faqAnswerType: 'text',
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: 'When will corporate action reflect in my holdings?',
                faqAnswer: [
                    {
                        faqAnswerText: `It will reflect on the execution date.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: 'After the delivery date it will start reflecting in your holdings.',
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Holdings'
        //faqCategoryPath: ['Stocks','Holdings'],
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How to invest in IPO?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Here are steps to apply for IPO`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Visit the below site`,
                        faqAnswerType: 'text',
                    },
                    {
                        faqAnswerText: `https://groww.in/ipo`,
                        faqAnswerType: 'link',
                    },
                    {
                        faqAnswerText: `You will see the list of open IPOs. Press the 'APPLY' button beside the IPO name you want to apply for.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `In the box on the right side, enter the number of shares you want to apply for`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Press the 'CONTINUE' button.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Enter your UPI ID. You will get this from your UPI app (Google Pay, PhonePe, etc).`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Press the 'CONTINUE' button.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `You will be able to see a timeline of your IPO application process and the tentative allotment date.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Within 24 hours, you will get a UPI mandate request on your UPI app. Approve it.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Note: The UPI mandate request may come instantly or may take up to 24 hours to come.`,
                        faqAnswerType: 'link'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `What is IPO?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Intial Public Offering (IPO) is the process in which a private company becomes public by selling a portion of its stake to investors.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `An IPO is generally initiated to infuse new equity capital into the firm, to facilitate easy trading of the existing assets, to raise capital for the future, or to monetize the investments made by existing stakeholders.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'IPO'
        //faqCategoryPath: ['Stocks','IPO'],
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What is stocks margin?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Margin is the money you borrow from Groww (broker) to trade in stocks.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `With the margin feature on Groww, you are able to buy stocks for as low as 15% of the total value of the stock.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `Why is my intraday profit amount blocked`,
                faqAnswer: [
                    {
                        faqAnswerText: `The intraday buy-sell profit amount has been blocked as per SEBI regulations, which will be released on the next market session (T+1) after the market closes.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Margin'
        //faqCategoryPath: [`Stocks`,`Margin`]
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What are account maintainance charges?`,
                faqAnswer: [
                    {
                        faqAnswerText: `This is Rs 0 on Groww.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Most platforms charge an annual maintenance charge (AMC) for the demat account.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `On Groww, we do not have any AMC.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Go to the link below to view pricing on stocks.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `https://groww.in/pricing/stocks`,
                        faqAnswerType: 'link'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `What are account opening charges?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Currently opening a stocks account is completely free on Groww.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `This may change in the near future. However, any change in account opening charge will be notified to all our users before implementing that update.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Charges'
        //faqCategoryPath: ['Stocks','Charges']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How can I access my stocks P&L report?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You can request your stocks P&L report in the Reports section.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `I did not get my report till now. When will I get it?`,
                faqAnswer: [
                    {
                        faqAnswerText: `It takes up to 24 hours for the report to be generated.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `If it has been more than 24 hours, please raise a ticket and reach out to us.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'P&L Reports'
        //faqCategoryPath: ['Stocks','P&L Reports']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How much does Groww charge for stocks?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Account opening=Rs 0`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Annual maintenance charge (AMC) = Rs 0`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Brokerage = Rs 20 or 0.05% per order (whichever is lower)`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Regulatory & statutory charges, penalties, and GST is extra and depends on the type of order.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `You can use the brokerage calculator to get an estimate of all the charges involved.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `Is there any rule for limit price of an order?`,
                faqAnswer: [
                    {
                        faqAnswerText: `As per exchange guidelines, you can buy or sell a stock within a certain range.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `This range is displayed to you when you're placing a buy or sell limit order.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Others'
        //faqCategoryPath: ['Stocks','Others']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How to start a SIP on Groww?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Visit the link below.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `https://groww.in/mutual-funds/filter`,
                        faqAnswerType: 'link'
                    },
                    {
                        faqAnswerText: `Search or choose a mutual fund.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Choose 'Monthly SIP'`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Enter the amount to invest`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Pay via UPI/Netbanking/NEFT`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Don't forget to add Biller/OTM/AutoPay for future installments.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Visit the link below to learn more about choosing mutual funds`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `https://groww.in/blog/how-to-choose-mutual-funds-in-india/`,
                        faqAnswerType: 'link'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `How to change SIP date or amount`,
                faqAnswer: [
                    {
                        faqAnswerText: `TO CHANGE THE SIP DATE:`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Cancel the existing SIP.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Start a new SIP with the new date.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `TO CHANGE THE SIP AMOUNT:`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Cancel the existing SIP.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Start a new SIP the new SIP amount.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'My SIPs'
        //faqCategoryPath: ['Mutual Funds','My SIPs']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How do I pay for a missed installment?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Go to MY SIPS.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Beside the mutual fund's name, you will see 'Invest' written. Click on it.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Enter the amount and choose 'One-Time'`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Complete the payment.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `What is AutoPay via Biller?`,
                faqAnswer: [
                    {
                        faqAnswerText: `AutoPay is an authorization to debit the monthly SIP amount from your bank account.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `This authorization is required only once and takes about 7 working days to be approved by your bank.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'AutoPay'
        //faqCategoryPath: ['Mutual Funds','AutoPay']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How do I import my external mutual fund investments`,
                faqAnswer: [
                    {
                        faqAnswerText: `Visit the link below`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `https://groww.in/track/request`,
                        faqAnswerType: 'link'
                    },
                    {
                        faqAnswerText: `Tap on 'Connect with Google'.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Choose the email ID in which you receive statements of your external mutual funds.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Continue on with the next steps.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Give permission to Groww to read your email. In 1-2 days, you will be able to see your external investments on the dashboard. Your imported investments will be updated every 30 days.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Note: Groww does not have access to any of your emails except the ones that come from fonotreply@camsonline.com and samfS@kfintech.com. Groww can only read messages that are from CAMS and Karvy so as to be able to read the mutual funds statements.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `What can I do with my external funds`,
                faqAnswer: [
                    {
                        faqAnswerText: `Once your external funds have been imported to Groww, you can easily invest more, redeem, and start SIP in that fund. If your external funds are regular plan funds, you can even switch them to direct plan(zero-commission).`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Import Funds'
        //faqCategoryPath: ['Mutual Funds','Import Funds']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What is Digital Gold?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Digital Gold is a convenient and cost-effective way of purchasing gold online.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `What is Gold Locker?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Gold Locker is a digital version of your holdings, wherein you can view your Digital Gold transactions.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'About Digital Gold'
        //faqCategoryPath: ['Gold','About Digital Gold']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How do I buy Digital Gold on Groww?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Enter the amount. You can input your desired purchase amount in rupees or grams of gold.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Buy in one-click: Review your order to make quick payment within the 5-minute price window.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Secured and insured: Your gold locker will be updated, where you can view your purchased Digital Gold holdings.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Visit the link below to login and buy gold.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `https://groww.in/dashboard/explore/stocks`,
                        faqAnswerType: 'link'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `How can I pay for Digital Gold purchase?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You can pay easily via UPI/Net banking.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Buying Gold'
        //faqCategoryPath: ['Gold','Buying Gold']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How do I sell Digital Gold purchased on Groww?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Digital Gold purchased on Groww can be sold back to Augmont anytime after the 2-day holding period from the date of purchase.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Click on the sell tab: Enter units to sell at the current selling price shown.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Sell in one-click: Review and place your sell request within the 5-minute price window.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Request confirmed: Your gold locker will be updated, where you can view your Digital Gold balance.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `You will receive the amount in your chosen bank account within 2 working days.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Visit the link below to check your gold.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `https://groww.in/dashboard/investments/gold`,
                        faqAnswerType: 'link'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `How soon can I sell the Digital Gold bought on Groww?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You will be able to sell the Gold bought on Groww after 2 working days from the date of purchase`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Selling Gold'
        //faqCategoryPath: ['Gold','Selling Gold']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How is the storage of physical gold taking place?`,
                faqAnswer: [
                    {
                        faqAnswerText: `The physical gold is stored by Augmont in 100% secured Sequel's vaults and insured (verified by an IDBI Trusteeship Service Pvt. Ltd. - an independent trustee).`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `What will happen to my gold if Augmont/Bullion India goes into liquidation?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Your gold assets are independent of the other assets of Bullion India.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `IDBI Trusteeship Services Pvt. Ltd. (appointed by Bullion India) acts as an independent trustee, who will ensure that the interests of the customers are protected.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `The trustee has sole and exclusive charge of the customer's gold held in the vault. Thus, in the event of any adverse effect to Bullion India, it should not effect the customer's gold assets.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Gold Storage & Insurance'
        //faqCategoryPath: ['Gold','Gold Storage & Insurance']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How many fixed deposits can I open?`,
                faqAnswer: [
                    {
                        faqAnswerText: `If your KYC is verified, you can open as many fixed deposits as you wish. However, till your KYC is under process, you can place only one order for opening a fixed deposit.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `What is the minimum/maximum tenure for opening a fixed deposit?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You can choose any tenure between 7 days and 10 years. It also depends on the products offered by the bank.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'About FDs'
        //faqCategoryPath: ['FDs','About FDs']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Why did my fixed deposit investment fail?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Your fixed deposit investment may fail due to incorrect/mismatched data in the KYC documents submitted resulting in KYC rejection or due to payment issues while booking the fixed deposit`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Please re-upload your documents or retry making the payment.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `If this is a recurring issue, please raise a ticket. We'll resolve this issue as soon as possible.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `How do I track my FD transaction?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Move to orders page for fixed deposits on the Groww website.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Note: If the amount has been deducted from your account but is not reflecting then it will be refunded back to your account in 2-3 working days.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'FD Orders'
        //faqCategoryPath: ['FDs','FD Orders']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How to get a TDS certificate for my fixed deposit?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You can download the TDS certificate from the bank's website/app via net banking.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `What is the tax implication on FD?`,
                faqAnswer: [
                    {
                        faqAnswerText: `TDS of 10% is deducted by the bank if the annual interest earned is more than Rs 40000 or Rs 50000 in case of senior citizens.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Taxation'
        //faqCategoryPath: ['FDs','Taxation']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Can I withdraw my fixed deposit before maturity?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Premature withdrawal of fixed deposits is not allowed for tax-saver deposits and monthly interest payout deposits.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Any other type of fixed deposit can be withdrawn before maturity.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Please refer to the 'FD Details' section of any fixed deposit for premature penalty information.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `Can I withdraw tax-saver deposits as they have a lock-in period of 5 years (minimum).`,
                faqAnswer: [
                    {
                        faqAnswerText: `No, you can't withdraw tax-saver deposits as they have a lock-in period of 5 years (minimum).`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Withdrawal'
        //faqCategoryPath: ['FDs','Withdrawal']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How to change email address?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Please raise a ticket. We will help you with this matter.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Visit the link below to raise a ticket and address the issue.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `https://groww.in/user/help/tickets/create`,
                        faqAnswerType: 'link'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `How to change name on Groww?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Please raise a ticket. We will help you with this matter.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Groww Account'
        //faqCategoryPath: ['My Account','Groww Account']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What are the documents required for getting my full KYC done?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You will need to upload the following`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Photo of PAN card`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Address proof (DL, Aadhar, Voter's ID)`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Photo of signature`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Passport size photo and`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Short 5 sec video of you holding your PAN card`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Visit the link below to proceed with uploading your documents.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `https://groww.in/onboarding/upload`,
                        faqAnswerType: 'link'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `Do you charge for processing KYC?`,
                faqAnswer: [
                    {
                        faqAnswerText: `No. We do not charge anything for processing your KYC. We do it for free along with your first investment.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `How long does it take to modify my KYC?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Once you have submitted the documents, it takes around 2-3 weeks to modify your KYC.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `This time to process is taken by the central KYC registry.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `If it has been already been 3 weeks since you submitted the documents, please contact us.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `How to complete my account?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You can complete your account by raising the ticket and inform us in details.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'KYC'
        //faqCategoryPath: ['My Account','KYC']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Can I invest using a credit/debit card?`,
                faqAnswer: [
                    {
                        faqAnswerText: `No, it is not possible to invest using credit/debit card on Groww.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `SEBI rules say the investments should be made through verified bank accounts only.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `It is not possible to verify bank accounts when investments are made using a credit/debit card.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `You can use the either UPI apps (Google Pay,PhonePe,BHIM,etc), Net banking or NEFT/RTGS/IMPS`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `Why do I need to add a bank account?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Wihout adding a bank account, it is not possible to invest.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `As per government rules, money invested in mutual funds should be linked to a bank account so that it can be withdrawn and paid back.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Bank Accounts'
        //faqCategoryPath: ['My Account','Bank Accounts']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How to add money for Groww Balance?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Here's how you can add money to your Groww Balance`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Visit the link below`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `https://groww.in/user/balance/inr`,
                        faqAnswerType: 'link'
                    },
                    {
                        faqAnswerText: `Tap on the button 'Add Money'`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Enter the amount you want to invest and tap 'Add Money'`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Then,complete the payment.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `The money will show in your Groww Balance.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `Why am I unable to withdraw the amount in 'Available to Invest'`,
                faqAnswer: [
                    {
                        faqAnswerText: `Any amount added to Groww is 'Available to invest' immediately. However, this amount will be 'Available to Withdraw' only after 1 working day.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Payments'
        //faqCategoryPath: ['My Account','Payments']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Browse similar products?`,
                faqAnswer: [],
                faqIsDynamic: true,
                faqDynamicKey: 'browseSimilarProducts',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `How to cancel an order?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You cancel your order by moving to individual orders page, click on cancel and press ok to confirm cancel your order.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Note: You cannot replace the same order after you cancel a particular order.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Completed'
        //faqCategoryPath: ['Orders','Completed']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Is there a penalty for cancellation?`,
                faqAnswer: [
                    {
                        faqAnswerText: `No there is no penalty for order cancellation.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `How long does cancellation take?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Cancellation may take upto 6-7 hours after confirming cancel within 30 minutes of placing order.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `For specific queries raise a ticket.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Cancelled'
        //faqCategoryPath: ['Orders','Cancelled']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How to place a pending order?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Move to your specific order page which is in pending status.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Press complete order.`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Complete the payment and place your order`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `If your order is still in pending status, raise a ticket.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `Can I cancel a pending order?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You can cancel a pending order by moving to the orders page and press on cancel and ok to confirm`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'Pending'
        //faqCategoryPath: ['Orders','Pending']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `How to do the payment of an order?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You can select any pending order and press on proceed to payment option.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
            {
                faqQuestion: `Is it possible to get the cashback if my order gets stuck?`,
                faqAnswer: [
                    {
                        faqAnswerText: `You will receive the refund amount in your bank account within 5-7 working days.`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            },
        ],
        faqCategoryName: 'General'
        //faqCategoryPath: ['Orders','General']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What is the stock value of Heranba Industries?`,
                faqAnswer: [
                    {
                        faqAnswerText: `National Stock Exchange (NSE): Rs 789.75`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Bombay Stock Exchange (BSE): Rs 789.50`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Heranba Industries General'
        //faqCategoryPath: ['Products','Heranba Industries','Heranba Industries General']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Do you wish to see your current stock holding for Heranba Industries?`,
                faqAnswer: [],
                faqIsDynamic: true,
                faqDynamicKey: 'getCurrentStockHolding',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Heranba Industries Previous Orders'
        //faqCategoryPath: ['Products','Heranba Industries','Heranba Industries Previous Orders']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What is the stock value of Vodafone Idea?`,
                faqAnswer: [
                    {
                        faqAnswerText: `National Stock Exchange (NSE): Rs 10.30`,
                        faqAnswerType: 'text'
                    },
                    {
                        faqAnswerText: `Bombay Stock Exchange (BSE): Rs 10.31`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Vodafone Idea General'
        //faqCategoryPath: ['Products','Vodafone Idea','Vodafone Idea General']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Do you wish to see your current stock holding for Vodafone Idea?`,
                faqAnswer: [],
                faqIsDynamic: true,
                faqDynamicKey: 'getCurrentStockHolding',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Vodafone Idea Previous Orders'
        //faqCategoryPath: ['Products','Vodafone Idea','Vodafone Idea Previous Orders']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What is the annual fund return value of ICICI Prudential Technology Direct Plan Growth?`,
                faqAnswer: [
                    {
                        faqAnswerText: `99.86%`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'ICICI Prudential Technology Direct Plan Growth General'
        //faqCategoryPath: ['Products','ICICI Prudential Technology Direct Plan Growth','ICICI Prudential Technology Direct Plan Growth General']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Do you want to check whether you have ICICI Prudential Technology Direct Plan Growth compounding?`,
                faqAnswer: [],
                faqIsDynamic: true,
                faqDynamicKey: 'checkAvailabilityPreviousOrders',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'ICICI Prudential Technology Direct Plan Growth Previous Orders'
        //faqCategoryPath: ['Products','ICICI Prudential Technology Direct Plan Growth','ICICI Prudential Technology Direct Plan Growth Previous Orders']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What is the monthly fund return value of Tata Digital India Fund Direct Growth?`,
                faqAnswer: [
                    {
                        faqAnswerText: `49.29%`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Tata Digital India Fund Direct Growth General'
        //faqCategoryPath: ['Products','Tata Digital India Fund Direct Growth','Tata Digital India Fund Direct Growth General']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Do you want to check whether you have any funds ordered for Tata Digital India Fund Direct Growth?`,
                faqAnswer: [],
                faqIsDynamic: true,
                faqDynamicKey: 'checkAvailabilityPreviousOrders',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Tata Digital India Fund Direct Growth Previous Orders'
        //faqCategoryPath: ['Products','Tata Digital India Fund Direct Growth','Tata Digital India Fund Direct Growth Previous Orders']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What is the rate of interest for Equitas 1 Year FD?`,
                faqAnswer: [
                    {
                        faqAnswerText: `6.50%`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Equitas 1 Year General'
        //faqCategoryPath: ['Products','Equitas 1 Year','Equitas 1 Year General']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Do you want to check whether you have Equitas 1 Year FD running?`,
                faqAnswer: [],
                faqIsDynamic: true,
                faqDynamicKey: 'checkAvailabilityPreviousOrders',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Equitas 1 Year Previous Orders'
        //faqCategoryPath: ['Products','Equitas 1 Year','Equitas 1 Year Previous Orders']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What is the premium withdrawal status for Equitas 3 months?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Premium withdrawal is available for Equitas 3 Months`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Equitas 3 Months General'
        // faqCategoryPath: ['Products','Equitas 3 Months','Equitas 3 Months General']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Do you want to check whether you have ordered Equitas 3 Months previously?`,
                faqAnswer: [],
                faqIsDynamic: true,
                faqDynamicKey: 'checkAvailabilityPreviousOrders',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Equitas 3 Months Previous Orders'
        //faqCategoryPath: ['Products','Equitas 3 Months','Equitas 3 Months Previous Orders']
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `What is the purity value of Groww Digital Gold?`,
                faqAnswer: [
                    {
                        faqAnswerText: `Groww ensures 99.90% purity for Digital Gold`,
                        faqAnswerType: 'text'
                    }
                ],
                faqIsDynamic: false,
                faqDynamicKey: '',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        //faqCategoryPath: ['Products','Augmont Gold','Augmont Gold General']
        faqCategoryName: 'Augmont Gold General'
    },
    {
        faqQuestionAnswer: [
            {
                faqQuestion: `Do you want to check whether you have previously bought gold?`,
                faqAnswer: [],
                faqIsDynamic: true,
                faqDynamicKey: 'checkAvailabilityPreviousOrders',
                faqUpvoteCount: 0,
                faqDownvoteCount: 0
            }
        ],
        faqCategoryName: 'Augmont Gold Previous Orders'
        //faqCategoryPath: ['Products','Augmont Gold','Augmont Gold Previous Orders']
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
        productMaxUnitsPerOrder: 2,
        productUrl: 'https://assets.thehansindia.com/h-upload/2021/02/16/1031553-heranba.webp'
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
        productMaxUnitsPerOrder: 4,
        productUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/INE669E01016.png',
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
        productMaxUnitsPerOrder: 1,
        productUrl: 'https://groww.in/images/partners/icici_groww.svg'
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
        productMaxUnitsPerOrder: 3,
        productUrl: 'https://groww.in/images/partners/tata_groww.svg'
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
        productMaxUnitsPerOrder: 1,
        productUrl: 'https://storage.googleapis.com/groww-assets/banking-assets/equitas-bank.svg'
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
        productMaxUnitsPerOrder: 2,
        productUrl: 'https://storage.googleapis.com/groww-assets/banking-assets/equitas-bank.svg'
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
        productMaxUnitsPerOrder: 2,
        productUrl: 'https://assets-netstorage.groww.in/website-assets/prod/1.5.2/build/client/images/logo-augmont.cb7c8652.png'
    },
]

let ordersArr = [
    {
        orderStatus: 'Completed',
        orderDate: '21/01/2021',
        category: 'Stocks',
        products: [],//link product ids
        units: [],//link no of units of products
        userId: null,//link userId
    },
    {
        orderStatus: 'Completed',
        orderDate: '22/01/2021',
        category: 'Mutual Funds',
        products: [],//link product ids
        units: [],//link no of units of products
        userId: null,//link userId
    },
    {
        orderStatus: 'Pending',
        orderDate: '23/01/2021',
        category: 'Gold',
        products: [],//link product ids
        userId: null,//link userId
    },
    {
        orderStatus: 'Pending',
        orderDate: '24/01/2021',
        category: 'Stocks',
        products: [],//link product ids
        units: [],//link no of units of products
        userId: null,//link userId
    },
    {
        orderStatus: 'Cancelled',
        orderDate: '24/02/2021',
        category: 'FDs',
        products: [],//link product ids
        units: [],//link no of units of products
        userId: null,//link userId
    },
    {
        orderStatus: 'Cancelled',
        orderDate: '25/02/2021',
        category: 'FDs',
        products: [],//link product ids
        units: [],//link no of units of products
        userId: null,//link userId
    },
    {
        orderStatus: 'Cancelled',
        orderDate: '25/02/2021',
        category: 'Mutual Funds',
        products: [],//link product ids
        units: [],//link no of units of products
        userId: null,//link userId
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
        userMaxOrdersPerDay: 5,
        userOrderPlacedToday: 0,
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
        userMaxOrdersPerDay: 3,
        userOrderPlacedToday: 0,
    },
]

const adminArr = [
    {
        userName: 'arnab@groww.com',
        userPass: 'Welcome@123',
    },
    {
        userName: 'sonal@groww.com',
        userPass: 'Welcome@321',
    }
]

exports.faqArr = faqArr;
exports.userArr = userArr;
exports.productArr = productArr;
exports.ordersArr = ordersArr;
exports.adminArr = adminArr;