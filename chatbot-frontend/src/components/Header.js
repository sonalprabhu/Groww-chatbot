import { Link} from 'react-router-dom';
import growwLogo from '../assets/groww-logo.png';
import './App.css';
import SubHeader from './SubHeader';
import { useDispatch } from 'react-redux'
import { close} from '../app/reducers/chatbotToggle'

export default function Header(props) {
  const dispatch = useDispatch()
  const pathname = document.location.pathname.split('/')

    return (
      <div className="container-fluid main">
          <div className="row" style={{'minHeight':'81px'}}>
          <div className="container web-align">
          <img src={growwLogo} alt="logo" height="40px" width="148px" offset="1000"/>
          <a className="mainLabel" href="/stocks">Explore</a>
          
           {props.user !== 'guest' && (<Link  to="/dashboard/orders/stocks" className="sideLabel">Orders</Link>)}
            {props.user !== 'guest' && <Link to="/dashboard/account" className="sideLabel side" >Account</Link> }
            {props.user !== 'guest' && <Link  className="sideLabel side" to="/logout">Logout</Link> }
            {props.user === 'guest' && <Link  className="sideLabel" to={{pathname:"/login"}}>Login</Link> }

          </div>
          </div>
      </div>
    );
   
  }
  
