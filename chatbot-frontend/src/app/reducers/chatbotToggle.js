import { createSlice } from '@reduxjs/toolkit'

export const chatbotToggle = createSlice({
  name: 'chatbot',
  initialState: {
    value: false
  },
  reducers: {
    open: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    close: state => {
      state.value = false
    },
    changeState : state => {
      state.value = !state.value
    }
  }
})

// Action creators are generated for each case reducer function
export const { open, close,changeState} = chatbotToggle.actions

export default chatbotToggle.reducer