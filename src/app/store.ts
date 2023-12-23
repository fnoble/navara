import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import chartsReducer from "../features/charts/chartsSlice"
import viewReducer from "./viewSlice"
import signalkReducer from "./signalkSlice"
import vesselsReducer from "../features/vessels/vesselsSlice"
import { signalkApi } from "../signalk/signalk"
import signalkMiddleware from "./signalkMiddleware"

export const store = configureStore({
  reducer: {
    [signalkApi.reducerPath]: signalkApi.reducer,
    charts: chartsReducer,
    view: viewReducer,
    signalk: signalkReducer,
    vessels: vesselsReducer,
  },
  middleware: (getDefaultMiddleware) => [
    signalkApi.middleware,
    signalkMiddleware,
    ...getDefaultMiddleware()
  ],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
