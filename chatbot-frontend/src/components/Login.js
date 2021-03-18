import { useState } from 'react';
import Cookies from 'js-cookie';

function Login(props){
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(props)
    const handleSubmit = async e => {
      e.preventDefault();
      setLoading(true);
      // NOTE request to api login here instead of this fake promise
      await new Promise(r => setTimeout(r(), 1000));
      Cookies.set('user',name);
      props.location.aboutProps.func.onLogIn(e);
      props.history.push("/stocks");
      setLoading(false);

    };
  
    if (loading) {
      return <h4>Logging in...</h4>;
    }
  
    return (
      <div style={{ marginTop: "1rem" }}>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  };

  export default Login;
