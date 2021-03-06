class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
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

    updateChatbotState(message,clientMessage) { 
         this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages,clientMessage,message]
          }))
        }
  }
  
  export default ActionProvider;