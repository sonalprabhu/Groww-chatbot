import { useEffect } from 'react';
import {userService} from '../services/user.service';
import { useDispatch } from 'react-redux';
import { logout } from '../app/reducers/authReducer';
import {clearMessages} from '../app/reducers/chatbotMessages';
import SubHeader from './SubHeader';

function Logout(props) {
  if(document.querySelector(".react-chatbot-kit-chat-input-container")){
    document.querySelector(".react-chatbot-kit-chat-input-container").style.display = 'none';
    }
  const dispatch = useDispatch()
    useEffect(
      
      async e => {
        dispatch(clearMessages())
          dispatch(logout())
        userService.logout()
        .then((response)=>{
          dispatch(clearMessages())
          dispatch(logout())
          props.history.push("/login");
        })
      },
    );
  
    return <div className="container web-align wrapper"><SubHeader/>Logging out!</div>;
  };

  export default Logout;