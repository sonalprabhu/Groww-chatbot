import React, { useState, useCallback,useEffect } from "react";
import { useSelector } from 'react-redux'
import axios from 'axios';

export default function App() {
    const [count, setCount] = useState(0);
    const userId=useSelector(state => state.users.userId)

    useEffect(() => {
        async function fetchData(){   
        var orderCount = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getMaxOrderLimit`,{params:{user:userId}})
      .then(res => {
        return res.data.maxOrderCount;
      })
      .catch((err)=>[]);        
        setCount(orderCount);
    }
   fetchData();
  
    }, []);

    const OnIncrementClick = useCallback((e) => {
        setCount(count + 1);
    }, [count]);

    const OnDecrementClick = useCallback((e) => {
        if (count - 1 >= 0)
            setCount(count - 1);
    }, [count]);

    function setMaxLimit() {
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/setMaxOrderLimit`,{},{ params:{maxOrderCount:count,user:userId}})
                .then((res) => setCount(res.data.maxOrderCount));
    }

    return (
        <div>

            <div className="container web-align wrapper">
                <div className="row d-flex justify-content-center">
                    <div className="MainDiv settings-card col-12">
                        <div className="DisplayDiv">
                            <p>Set Max Orders Per Day</p>
                        </div>
                        <div className="settingsDiv">
                            <div className="counter-value"> {count === 0 ? 'No Limit Set' : count} </div>
                            <div className="ButtonDiv">
                                <button onClick={OnIncrementClick} className="custom-button">Increment</button>
                                <button onClick={OnDecrementClick} className="custom-button">Decrement</button>
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary save-btn" onClick={()=>setMaxLimit()}>Save</button>
                </div>
            </div>
        </div>

    )
}
