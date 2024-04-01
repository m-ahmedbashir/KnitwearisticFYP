import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import { getAllSamOrders } from "./Services/GetAllSamOrders";
import Activity from './Services/Activity';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    activity: Activity,
    [getAllSamOrders.reducerPath]: getAllSamOrders.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: false,
    }
  ).concat(getAllSamOrders.middleware),
})
