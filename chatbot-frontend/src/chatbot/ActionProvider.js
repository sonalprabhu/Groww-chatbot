import axios from 'axios';

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage,state) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
      this.state=state;
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
      axios.get(`http://localhost:8081/get-answer-by-questionId/${selectedQuestion.QuestionId}`)
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