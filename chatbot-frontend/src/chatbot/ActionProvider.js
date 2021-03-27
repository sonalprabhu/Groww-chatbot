import axios from 'axios';
import Cookies from "js-cookie";

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
      this.products =['Stocks','FDs','Gold','Mutual Funds'];
    }
  
    greet() {
      const greetingMessage = this.createChatBotMessage("Hi, friend.")
      this.updateChatbotState(greetingMessage)
    }

    handleAccountList = (text) => {
      const clientMessage=this.createClientMessage(text)
      const message = this.createChatBotMessage(
        `Fantastic, I've got the following categories in ${text}:`,
        {
          widget: "javascriptLinks",
        }
      );
  
      this.updateChatbotState(message,clientMessage);
    };

    handleQuestionClick = (selectedQuestion) =>{
      const clientMessage=this.createClientMessage(selectedQuestion.QuestionText);
      this.updateChatbotStateWithClientMessage(clientMessage);
      const userId = Cookies.get('userId') || '';
      var productId,orderId;
      const pathname = (window.location.pathname).split('/');
      const pathLength = pathname.length;
      var paramList ={};
      var mapper={
        "stocks":'Stocks',
        "fd":'FDs',
        "gold":'Gold',
        "mutualfund":'Mutual Funds'
      }
      if(this.products.indexOf(mapper[pathname[1]]) > -1 )
      {
        productId = pathname[pathLength-1];
        paramList.product=productId;
      }
      if(userId!== ''){
        paramList.user=userId;
          if(pathLength==5){
          if(pathname[2]==='orders')
          {
            orderId = pathname[pathLength-1];
            paramList.order=orderId;
          }
        }
      }
     
      
      axios.get(`http://localhost:8081/get-answer-by-questionId/${selectedQuestion.QuestionId}`,{params:paramList})
      .then(res => {
        var ans = res.data.Answer;
        var msg=[];
        for(let a in ans)
        msg.push(this.createChatBotMessage(ans[a]));
        this.updateChatbotStateWithBotMessage(msg);
      });
    }

    updateChatbotStateWithClientMessage(clientMessage) { 
         this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages,clientMessage]
          }))
        }

    updateChatbotStateWithBotMessage(message) { 
          this.setState(prevState => ({
             ...prevState, messages: [...prevState.messages,...message]
           }))
         }
  }
  
  export default ActionProvider;