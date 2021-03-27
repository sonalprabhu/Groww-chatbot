import { useState } from 'react';
import {userService} from '../services/user.service';
import { useDispatch } from 'react-redux';
import {login, logout} from '../app/reducers/authReducer';
import Logout from './Logout';
import SubHeader from './SubHeader';

function Login(props){
    const [name, setName] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    
    const handleSubmit = async e => {
      e.preventDefault();
      setLoading(true);
      userService.login(name,password)
      .then((success)=>{
        const user={userName:success.data.userName,userId:success.data.userId}
        dispatch(login(user))
        setTimeout(()=>props.history.push('/logout'), 15 * 60 * 1000);
        props.history.push("/stocks");
        
      })
      

    };
  
    if (loading) {
      return <h4>Logging in...</h4>;
    }
  
    return (
        <div className="container web-align wrapper">
        <SubHeader/>
      <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (!name ? ' has-error' : '')}>
                        <label htmlFor="name">Username</label>
                        <input type="text" className="form-control" name="name" value={name} onChange={e=>setName(e.target.value)} />
                        {!name &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (!password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={e=>setPassword(e.target.value)} />
                        {!password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {!loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
            </div>
    );
  };

  export default Login;
