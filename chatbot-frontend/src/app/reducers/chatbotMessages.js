import { createSlice } from '@reduxjs/toolkit'

export const chatbotMessages = createSlice({
  name: 'messages',
  initialState: 
  {
    value:[]
  },
  reducers: {
    storeMessages: (state,action) => {
      state.value = action.payload
    },
    clearMessages: state => {
        state.value = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { storeMessages,clearMessages} = chatbotMessages.actions

export default chatbotMessages.reducer