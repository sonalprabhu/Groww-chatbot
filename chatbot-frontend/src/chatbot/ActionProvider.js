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
      const greetingMessage = this.createChatBotMessage("Please select from available questions")
      this.updateChatbotState(greetingMessage)
    }

    handleCategoryClick = (option) =>{
      const clientMessage=this.createClientMessage(option.Name);
      Cookies.set('categoryId',option.categoryId);
      this.updateChatbotStateWithClientMessage(clientMessage); 
      const message = this.createChatBotMessage("These are some more categories",
      {
      widget: "FullFAQ" }); 
      this.updateChatbotState(message);
    }

    handleMoreQuestionsClick = () => {
      const clientMessage=this.createClientMessage("I have more queries");
      this.updateChatbotStateWithClientMessage(clientMessage); 
      const message = this.createChatBotMessage(
        `Feel free to explore our wide category list`,
        {
          widget: "FullFAQ",
        }
      ); 
      this.updateChatbotState(message);
     
    }

    handleCategoryQuestionClick =(category) =>{
      const clientMessage=this.createClientMessage(category.Name);
      Cookies.set('categoryId',category.categoryId);
      this.updateChatbotStateWithClientMessage(clientMessage); 
      const message = this.createChatBotMessage("These are the questions under this category",
      {
      widget: "faqSubCategory" }); 
      this.updateChatbotState(message);
    }
    

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
     
      
      axios.get(`http://localhost:8081/get-answer-by-questionId/${selectedQuestion.QuestionId}/${selectedQuestion.QuestionPos}`,{params:paramList})
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
    updateChatbotState(message){
      this.setState(prevState => ({
        ...prevState, messages: [...prevState.messages,message]
      }))
    }
  }
  
  export default ActionProvider;