import './App.css';
import { Link } from 'react-router-dom';
import growwLogo from '../assets/groww-logo.png';
import { useDispatch } from 'react-redux'
import { close } from '../app/reducers/chatbotToggle';
import Button from 'react-bootstrap/Button';

export default function Header(props) {
    const dispatch = useDispatch()
    const pathname = document.location.pathname.split('/')
    if (document.querySelector(".react-chatbot-kit-chat-input-container")) {
        document.querySelector(".react-chatbot-kit-chat-input-container").style.display = 'none';
    }

    return (
        <div className="container-fluid main">
            <div className="row" style={{ 'minHeight': '81px' }}>
                <div className="container web-align">
                    <img src={growwLogo} alt="logo" height="40px" width="148px" offset="1000" />
                    <Link to="/stocks" className="mainLabel" onClick={() => dispatch(close())}>Explore</Link>

                    {props.user !== 'guest' && (<Link to="/dashboard/orders/stocks" className="sideLabel" onClick={() => dispatch(close())}><i className="fa fa-shopping-cart fa-2x" aria-hidden="true"></i></Link>)}
                    {props.user !== 'guest' && <Link to="/dashboard/account" className="sideLabel side account" onClick={() => dispatch(close())}><i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i></Link>}
                    {props.user !== 'guest' && <Link className="sideLabel side" to="/logout" onClick={() => dispatch(close())}><Button>Logout</Button></Link>}
                    {props.user === 'guest' && pathname[1] !== 'login' && <Link className="sideLabel" to={{ pathname: "/login" }} onClick={() => dispatch(close())}><Button>Login</Button></Link>}

                </div>
            </div>
        </div>
    );

}

