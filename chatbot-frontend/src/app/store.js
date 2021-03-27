import { configureStore } from '@reduxjs/toolkit'
import chatbotReducer from '../app/reducers/chatbotToggle';
import authReducer from '../app/reducers/authReducer'

export default configureStore({
  reducer: {
    chatbot: chatbotReducer,
    users : authReducer
  }
})