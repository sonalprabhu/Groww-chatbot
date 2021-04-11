import axios from 'axios';
import Cookies from "js-cookie";
axios.defaults.withCredentials = true



async function login(name,password){
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/login`,{params: {
    userName: name,
    userPass: password
    }},{withCredentials:true})
    .then((response) => {
    var inFifteenMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
    Cookies.set('user',response.data.userName,{expires:inFifteenMinutes});
    Cookies.set('userId',response.data.userId,{expires:inFifteenMinutes});
    return response;
    }, (error) => {
    console.log(error);
    });
}

async function logout(){
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`,{params:{user:Cookies.get('userId')}},{withCredentials:true})
    .then((response) => {
    Cookies.set('user','guest');
    Cookies.set('userId','');
    return response;
    }, (error) => {
    console.log(error);
    });
}

export const userService = {
    login,
    logout
};
