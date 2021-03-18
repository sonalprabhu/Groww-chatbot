import { useState,useEffect } from 'react';
import Cookies from 'js-cookie';

function Logout(props) {
    useEffect(
      async e => {
       
        props.location.aboutProps.func.onLogOut(e);
        props.history.push("/login");
      },
    );
  
    return <div>Logging out!</div>;
  };

  export default Logout;