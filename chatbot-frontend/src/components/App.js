import './App.css';
import React, { useState, useEffect } from 'react';

/*Redux Imports */
import { useSelector, useDispatch } from 'react-redux'
import { changeState } from '../app/reducers/chatbotToggle';
import { clearMessages, storeMessages } from '../app/reducers/chatbotMessages';
import { connect } from 'react-redux';

/* reat-chatbot-kit imports*/
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../chatbot/ActionProvider';
import MessageParser from '../chatbot/MessageParser';
import { createChatBotMessage } from "react-chatbot-kit";

import { Switch, Route, Redirect } from 'react-router-dom';

/* user routes imports */
import Header from './Header';
import Products from './Products';
import ProductPage from './ProductPage'
import Orders from './Orders';
import Account from './Account';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Logout from './Logout';
import Settings from './Settings';
import OrderPage from './OrderPage';

/* chatbot widgets imports */
import FullFAQ from '../chatbot-widgets/FullFAQ';
import Alert from '../chatbot-widgets/Alert';
import NextSet from '../chatbot-widgets/NextSet';
import FAQ from '../chatbot-widgets/FAQ';
import CategorySubQuestions from '../chatbot-widgets/CategorySubQuestion';

import { NotificationContainer } from 'react-notifications';
import Button from 'react-bootstrap/Button';
import botLogo from '../assets/bot-logo.png';

function App(props) {
    const userName = useSelector(state => state.users.user);
    const userId = useSelector(state => state.users.userId);
    const chatbotMessages = useSelector(state => state.messages.value);
    const [user, setUser] = useState({ userName, userId });
    const isOpen = useSelector(state => state.chatbot.value)
    const dispatch = useDispatch()
    if (document.querySelector(".react-chatbot-kit-chat-input-container")) {
        document.querySelector(".react-chatbot-kit-chat-input-container").style.display = 'none';
    }

    useEffect(() => {

        if (props) {
            setUser({ userName: props.user.user, userId: props.user.userId })
        }
    }, [props.user, props.messages]);


    const saveMessages = (messages) => {
        dispatch(storeMessages(messages))
    };

    const loadMessages = () => {
        var oldMessages = JSON.parse(JSON.stringify(chatbotMessages));
        let initialMessage;
        if (oldMessages)
            oldMessages = oldMessages.filter((messages) => {
                if (messages.message && (typeof messages.message === 'string') && (messages.message.includes('Hello')))
                    initialMessage = messages;
                else if (messages.message && (typeof messages.message === 'string') && !messages.message.includes('Feel free to explore our wide category list')
                    && !messages.message.includes('These are some more categories') &&
                    !messages.message.includes('These are the questions under this category'))
                    return messages;
            })

        if (initialMessage)
            oldMessages.push(initialMessage)

        return oldMessages;
    };


    /* Initial Configuration for chatbot package */
    const config = {
        botName: "Groww Chatbot",
        initialMessages: [createChatBotMessage(`Hello !What would you like to know?`, { widget: "FAQ" }),],
        customStyles: {
            botMessageBox: {
                backgroundColor: "#00d09c",
            },
            chatButton: {
                backgroundColor: "#00d09c",
            },
        },
        customComponents: {
            header: () => <div className="react-chatbot-kit-chat-header">Groww Chatbot Assistant</div>,
            botAvatar: (props) => <img alt="chatbot" className="react-chatbot-kit-chat-bot-avatar-container"
                src={botLogo} width="40px" height="40px" />,
        },
        widgets: [
            {
                widgetName: "FAQ",
                widgetFunc: (props) => <FAQ {...props} />,
                props: { user: userName, userId: user.userId }
            },
            {
                widgetName: "FullFAQ",
                widgetFunc: (props) => <FullFAQ {...props} />,
            },
            {
                widgetName: "faqSubCategory",
                widgetFunc: (props) => <CategorySubQuestions {...props} />,
            },
            {
                widgetName: "alert",
                widgetFunc: (props) => <Alert {...props} />,
            },
            {
                widgetName: "nextset",
                widgetFunc: (props) => <NextSet {...props} />
            }
        ],
    };




    return (
        <div className="App">
            <Header user={user.userName} />
            <Switch><Route exact path={["/stocks/:id", "/mutualfund/:id", "/fd/:id", "/gold/:id"]} component={ProductPage} />}/> </Switch>
            <Switch> <Route exact path="/fd" render={() => <Products text="FD" />} /> </Switch>
            <Switch> <Route exact path="/gold" render={() => <Products text="Gold" />} /></Switch>
            <Switch> <Route exact path="/mutualfund" render={() => <Products text="Mutual Funds" />} /></Switch>
            <Switch> <Route exact path="/stocks" component={() => <Products text="Stocks" />} /> </Switch>
            <Switch> <Route exact path="/login" component={Login} /> </Switch>
            <Switch> <PrivateRoute exact path="/logout" isAuthenticated={user.userName !== 'guest'} component={Logout} /> </Switch>
            <Switch> <PrivateRoute path={["/dashboard/orders/stocks/:id", "/dashboard/orders/mutualfund/:id", "/dashboard/orders/fd/:id", "/dashboard/orders/gold/:id"]} isAuthenticated={user.userName !== 'guest'} component={OrderPage} /> </Switch>
            <Switch> <PrivateRoute exact path={["/dashboard/orders/stocks", "/dashboard/orders/mutualfund", "/dashboard/orders/fd", "/dashboard/orders/gold"]} isAuthenticated={user.userName !== 'guest'} component={Orders} /> </Switch>
            <Switch> <PrivateRoute exact path="/dashboard/account" isAuthenticated={user.userName !== 'guest'} component={Account} /> </Switch>
            <Switch> <PrivateRoute exact path="/dashboard/account/settings" isAuthenticated={user.userName !== 'guest'} component={Settings} /> </Switch>
            <Redirect to="/stocks" from="/" />

            <div className="chatbot">
                {isOpen && (
                    chatbotMessages.length === 0 ? (
                        <Chatbot config={config}
                            actionProvider={ActionProvider} messageParser={MessageParser}
                            saveMessages={saveMessages}
                        />)
                        :
                        <Chatbot config={config}
                            actionProvider={ActionProvider} messageParser={MessageParser}
                            saveMessages={saveMessages} messageHistory={loadMessages()}
                        />)}
            </div>
            {!isOpen && chatbotMessages.length !== 0 && (<Button className="clear-btn" onClick={() => dispatch(clearMessages())}><i className="fa fa-trash" aria-hidden="true"></i></Button>)}
            <Button className="bot-btn" onClick={() => dispatch(changeState())}>&nbsp;</Button>

            <NotificationContainer />
        </div>
    );
}

const mapStateToProps = (store) => {
    return { user: store.users, messages: store.messages }
}

export default connect(mapStateToProps)(App);
