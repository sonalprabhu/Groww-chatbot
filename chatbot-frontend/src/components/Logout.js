import { useEffect } from 'react';
import {userService} from '../services/user.service';
import { useDispatch } from 'react-redux';
import { logout } from '../app/reducers/authReducer';
import SubHeader from './SubHeader';

function Logout(props) {
  const dispatch = useDispatch()
    useEffect(
      async e => {
        userService.logout()
        .then((response)=>{
          dispatch(logout())
          props.history.push("/login");
        })
      },
    );
  
    return <div className="container web-align wrapper"><SubHeader/>Logging out!</div>;
  };

  export default Logout;