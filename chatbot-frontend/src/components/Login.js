import { useState } from 'react';
import {userService} from '../services/user.service';
import { useDispatch } from 'react-redux';
import {login, logout} from '../app/reducers/authReducer';
import Logout from './Logout';
import SubHeader from './SubHeader';
import {clearMessages} from '../app/reducers/chatbotMessages';
import ReactTypingEffect from 'react-typing-effect';

function Login(props){
    if(document.querySelector(".react-chatbot-kit-chat-input-container")){
        document.querySelector(".react-chatbot-kit-chat-input-container").style.display = 'none';
        }
    const [name, setName] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    
    const handleSubmit = async e => {
      e.preventDefault();
      setLoading(true);
      if(name && password){
      userService.login(name,password)
      .then((success)=>{
        const user={userName:success.data.userName,userId:success.data.userId}
        dispatch(clearMessages())
        dispatch(login(user))
        setTimeout(()=>props.history.push('/logout'), 20 * 60 * 1000);
        props.history.push("/stocks");
        
      });}
      else
      setLoading(false);
      

    };
  
    if (loading) {
      return (
        <div>
        <SubHeader/>
        <div className="container web-align wrapper">
        <h4>Logging in...</h4>{loading &&
        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
             }
        </div>
        </div>
        );
    }
  
    return (
        <div>
        
        <div className="container web-align wrapper">
        <div className="row login-container">
        <div className="col-md-6 login-left">
        Simple, Free Investing
        <div className="typingeffect" text={['Stocks',
            'Mutual Funds','Fixed Deposits','Gold']} ></div>
            </div>
      <div className="col-md-6 login-right">
                <h2>Welcome to Groww</h2>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (!name ? ' has-error' : '')}>
                        <label htmlFor="name">Username</label>
                        <input type="text" className="form-control" name="name" value={name} onChange={e=>setName(e.target.value)} />
                        {!name &&
                            <div className="help-block">*Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (!password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={e=>setPassword(e.target.value)} />
                        {!password &&
                            <div className="help-block">*Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
            </div>
            </div>
            </div>
    );
  };

  export default Login;
