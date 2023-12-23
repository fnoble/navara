import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface SignalKState {
    connecting: boolean;
    connected: boolean;
}
 
const initialState: SignalKState = {
    connecting: false,
    connected: false,
};
 
const signalkSlice = createSlice({
  name: 'signalk',
  initialState,
  reducers: {
    startConnecting: (state => {
      state.connected = false;
      state.connecting = true;
    }),
    connectionEstablished: (state => {
      state.connected = true;
      state.connecting = false;
    }),
    disconnected: (state => {
      state.connected = false;
      state.connecting = false;
    }),
  },
});

export const selectSignalKConnected = (state: RootState): boolean => {
  return state.signalk.connected;
}
 
export const { startConnecting, connectionEstablished, disconnected } = signalkSlice.actions
 
export default signalkSlice.reducer;