import axios from 'axios';

const getAllCategoriesPaths = async ()=>{
    return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/getAllCategoryPaths`).then((response)=>response.data);
}

const getDynamicFuncs = async () => {
    return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/getDynamicFuncs`).then((response)=>response.data);
}

const addFaq = async (data) => {
    return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/addFaq`,data,{
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    }).then((response)=>response.data);
}

const loginAdmin = async (data) => {
    return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/loginAdmin`,{withCredentials: true,params: {
        userName: data.userName,
        userPass: data.userPass,
    }}).then((response)=>response.status);
}

const getAllNodes = async () => {
    return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/getAllNodes`,{withCredentials:true}).then((response)=>response.data);
}

const addCategory = async (data) => {
    return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/addCategory`,data,{
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    }).then((response)=>response.data);
}

export {getAllCategoriesPaths,getDynamicFuncs,addFaq,loginAdmin,getAllNodes,addCategory};