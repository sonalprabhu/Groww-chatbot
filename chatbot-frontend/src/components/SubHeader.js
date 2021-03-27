import { Link} from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux'
import { close} from '../app/reducers/chatbotToggle'


export default function SubHeader(props) {
  const dispatch = useDispatch()
  const pathname = document.location.pathname.split('/')
  var stockRoute="/stocks";
  var mfRoute="/mutualfund";
  var goldRoute="/gold";
  var fdRoute="/fd";
  if(props.link)
  {
    stockRoute = props.link+stockRoute;
    mfRoute = props.link + mfRoute;
    goldRoute = props.link + goldRoute;
    fdRoute = props.link + fdRoute;
  }

  function changeClass(event){
    var selected=document.querySelector(".selected-option");
    selected.classList.remove("selected-option");
    var ele=event.target;
    ele.classList.add("selected-option");
  }

  function onClick(event,route){
    changeClass(event);
    dispatch(close());
    if(props.onClick)
    {
      props.onClick(route)
    }
  }

    return (

          <div className="row options">
          <div className="container web-align">
          <Link to={stockRoute} className="subLabel selected-option" onClick={(e)=>onClick(e,stockRoute)}>Stocks</Link>
          <Link to={mfRoute} className="subLabel" onClick={(e)=>onClick(e,mfRoute)}>Mutual Funds</Link>
          <Link to={fdRoute} className="subLabel" onClick={(e)=>onClick(e,fdRoute)}>Fixed Deposits</Link>
          <Link to={goldRoute} className="subLabel" onClick={(e)=>onClick(e,goldRoute)}>Gold</Link>
          </div>
          </div>

    );
   
  }
  
