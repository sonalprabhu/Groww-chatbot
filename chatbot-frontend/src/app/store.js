import { configureStore,combineReducers,getDefaultMiddleware } from '@reduxjs/toolkit'
import chatbotReducer from '../app/reducers/chatbotToggle';
import authReducer from '../app/reducers/authReducer';
import messageReducer from '../app/reducers/chatbotMessages';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// const hashAlgorithm = function(s){
//   return "Secure" + s + "Store";
// }

// const saveState = (state) =>{
//   const {info}=state;
//   try{
//     const crypto = jwt.sign({
//       info,
//     },'StoreReduxStateInASecureWay');
//     localStorage.setItem('persist:root',crypto);
//     localStorage.setItem('stateToken',hashAlgorithm(JSON.stringify(
//       info)));
//   }
//   catch(e){

//   }
// }

// const persistedState = jwt.verify(localStorage.getItem('persist:root','StoreReduxStateInASecureWay',
// (err,decoded)=>{
//   try{
//     if(decoded){
//       if(localStorage.getItem('persist:root')){
//         const {info}= decoded;
//         if(hashAlgorithm(JSON.stringify(info)).toString() !==
//       localStorage.getItem('stateToken').toString()){
//         localStorage.clear();
//       }
//       return ({info});
//       }
//       return undefined;
//     }
//     localStorage.clear();
//   }
//   catch(e){

//   }
// }
// ))

const rootReducer = combineReducers({
  users: authReducer,
  chatbot: chatbotReducer,
  messages: messageReducer
});

const persistConfig = {
  key: 'root',
  version: 1,
  whitelist:['messages','users'],
  storage,
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
      onError: function (error) {
        // Handle the error.
      },
    }),
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})


let persistor = persistStore(store)


// export default configureStore({
//   reducer: {
//     chatbot: chatbotReducer,
//     users : authReducer
//   }
// })

export default store;
export {persistor}

