import { Link} from 'react-router-dom';
import growwLogo from '../assets/groww-logo.png';
import './App.css';
import { useDispatch } from 'react-redux'
import { close} from '../app/reducers/chatbotToggle';
import Button from 'react-bootstrap/Button';

export default function Header(props) {
  const dispatch = useDispatch()
  const pathname = document.location.pathname.split('/')

    return (
      <div className="container-fluid main">
          <div className="row" style={{'minHeight':'81px'}}>
          <div className="container web-align">
          <img src={growwLogo} alt="logo" height="40px" width="148px" offset="1000"/>
          <a className="mainLabel" href="/stocks" onClick={()=>dispatch(close())}>Explore</a>
          
           {props.user !== 'guest' && (<Link  to="/dashboard/orders/stocks" className="sideLabel" onClick={()=>dispatch(close())}>Orders</Link>)}
            {props.user !== 'guest' && <Link to="/dashboard/account" className="sideLabel side" onClick={()=>dispatch(close())}>Account</Link> }
            {props.user !== 'guest' && <Link  className="sideLabel side" to="/logout" onClick={()=>dispatch(close())}><Button>Logout</Button></Link> }
            {props.user === 'guest' && <Link  className="sideLabel" to={{pathname:"/login"}} onClick={()=>dispatch(close())}><Button>Login</Button></Link> }

          </div>
          </div>
      </div>
    );
   
  }
  
