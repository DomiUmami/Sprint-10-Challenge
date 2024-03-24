import { configureStore } from '@reduxjs/toolkit'
import { pizzaApi } from './pizzaApi'



export const resetStore = () => configureStore({
  reducer: {
    // add your reducer(s) here,
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    pizzaApi.middleware
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
