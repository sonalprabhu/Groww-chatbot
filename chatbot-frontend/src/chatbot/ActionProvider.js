import axios from 'axios';
import '../components/App.css';
import Cookies from 'js-cookie';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.products = ['Stocks', 'FDs', 'Gold', 'Mutual Funds'];
  }

  handleNext(){
    const message = this.createChatBotMessage("Hello, What do you want to know?",
      {
        widget: "FAQ"
      });
    this.updateChatbotState(message);
  }

  greet() {
    const greetingMessage = this.createChatBotMessage("Please select from available questions")
    this.updateChatbotState(greetingMessage)
  }

  handleCategoryClick = (option) => {
    const clientMessage = this.createClientMessage(option.Name);
    Cookies.set('categoryId', option.categoryId);
    this.updateChatbotStateWithClientMessage(clientMessage);
    const message = this.createChatBotMessage("These are some more categories",
      {
        widget: "FullFAQ"
      });
    this.updateChatbotState(message);
  }

  handleMoreQuestionsClick = () => {
    console.log(process.env.REACT_APP_BACKEND_URL)
    const clientMessage = this.createClientMessage("I have more queries");
    this.updateChatbotStateWithClientMessage(clientMessage);
    const message = this.createChatBotMessage(
      `Feel free to explore our wide category list`,
      {
        widget: "FullFAQ",
      }
    );
    this.updateChatbotState(message);

  }

  handleCategoryQuestionClick = (category) => {
    const clientMessage = this.createClientMessage(category.Name);
    Cookies.set('categoryId', category.categoryId);
    this.updateChatbotStateWithClientMessage(clientMessage);
    const message = this.createChatBotMessage("These are the questions under this category",
      {
        widget: "faqSubCategory"
      });
    this.updateChatbotState(message);
  }


  handleQuestionClick = (selectedQuestion) => {
    const clientMessage = this.createClientMessage(selectedQuestion.QuestionText);
    this.updateChatbotStateWithClientMessage(clientMessage);
    const userId = Cookies.get('userId') || '';
    var productId, orderId;
    const pathname = (window.location.pathname).split('/');
    const pathLength = pathname.length;
    var paramList = {};
    var mapper = {
      "stocks": 'Stocks',
      "fd": 'FDs',
      "gold": 'Gold',
      "mutualfund": 'Mutual Funds'
    }
    if (this.products.indexOf(mapper[pathname[1]]) > -1) {
      productId = pathname[pathLength - 1];
      paramList.product = productId;
    }
    if (userId !== '') {
      paramList.user = userId;
      if (pathLength === 5) {
        if (pathname[2] === 'orders') {
          orderId = pathname[pathLength - 1];
          paramList.order = orderId;
        }
      }
    }


    axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-answer-by-questionId/${selectedQuestion.QuestionId}/${selectedQuestion.QuestionPos}`, { params: paramList })
      .then(res => {
        var ans = res.data.Answer;
        var msg = [];
        for (let a in ans) {
          if (ans[a].faqAnswerType !== 'link')
            msg.push(this.createChatBotMessage(ans[a].faqAnswerText));
          else
            msg.push(this.createChatBotMessage(<a className="link-text" href={ans[a].faqAnswerText}>{ans[a].faqAnswerText}</a>));

        }
        this.updateChatbotStateWithBotMessage(msg);
      }).then(() => {
        var message = this.createChatBotMessage('...', {
          widget: "nextset"
        });
        this.updateChatbotState(message)
      })
  }

  handleQuestionLike(option) {
    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/increaseUpvoteCount/${option.QuestionId}/${option.QuestionPos}`)
      .then(res =>
        console.log(res));
  }

  handleQuestionDislike(option) {
    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/increaseDownvoteCount/${option.QuestionId}/${option.QuestionPos}`)
      .then(res =>
        console.log(res));
  }

  updateChatbotStateWithClientMessage(clientMessage) {
    this.setState(prevState => ({
      ...prevState, messages: [...prevState.messages, clientMessage]
    }))
  }

  updateChatbotStateWithBotMessage(message) {
    this.setState(prevState => ({
      ...prevState, messages: [...prevState.messages, ...message]
    }))
  }
  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState, messages: [...prevState.messages, message]
    }))
  }
}

export default ActionProvider;