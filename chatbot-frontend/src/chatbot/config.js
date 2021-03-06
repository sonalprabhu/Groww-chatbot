import { createChatBotMessage,updateChatBotState } from "react-chatbot-kit";
import FAQ from '../components/FAQ';

  function Config(props) {
    return{
    botName:"Groww Chatbot",
    initialMessages: [createChatBotMessage("Hello!What do you want to know?",{widget:"FAQ"}),],
    customStyles: {
      botMessageBox: {
        backgroundColor: "#00d09c",
      },
      chatButton: {
        backgroundColor: "#00d09c",
      },
    },
    widgets: [
      {
        widgetName: "FAQ",
       widgetFunc: (props) => <FAQ {...props} />,
      },
  ],
  };
}

export default Config;
