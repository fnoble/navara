import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import chartsReducer from "../features/charts/chartsSlice"
import viewReducer from "./viewSlice"
import { signalkApi } from "../signalk/signalk"

export const store = configureStore({
  reducer: {
    [signalkApi.reducerPath]: signalkApi.reducer,
    charts: chartsReducer,
    view: viewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signalkApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
