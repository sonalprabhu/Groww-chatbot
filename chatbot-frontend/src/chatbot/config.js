import { createChatBotMessage} from "react-chatbot-kit";
import FAQ from '../chatbot-widgets/FAQ';

 const config =
 {
    botName:"Groww Chatbot",
    initialMessages: [
      createChatBotMessage("Hello!What do you want to know?",{widget:"FAQ"}),],
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
}

export default config;
