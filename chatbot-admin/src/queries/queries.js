import axios from 'axios';

const getAllCategoriesPaths = async ()=>{
    return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/getAllCategoryPaths`).then((response)=>response.data);
}

const getDynamicFuncs = async () => {
    return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/getDynamicFuncs`).then((response)=>response.data);
}

const addFaq = async (data) => {
    return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/addFaq`,data,{
        headers: {'Content-Type': 'application/json'}
    }).then((response)=>response.data);
}

export {getAllCategoriesPaths,getDynamicFuncs,addFaq};