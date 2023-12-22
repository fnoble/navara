import {MapViewState} from '@deck.gl/core/typed';

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ViewState {
  padding?: number,
  latitude: number,
  longitude: number,
  zoom: number,
  bearing: number,
  pitch: number
}

const initialState: MapViewState = {
  latitude: 37.77,
  longitude: -122.42,
  zoom: 9,
  bearing: 0,
  pitch: 0
}

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    zoomIn: (state) => {
      state.zoom += 1
      state.transitionDuration = 100;
    },
    zoomOut: (state) => {
      state.zoom -= 1
      state.transitionDuration = 100;
    },
    setDeckGlViewState: (_state, action) => {
      return action.payload;
    },
  },
})

export const { zoomIn, zoomOut, setDeckGlViewState } = viewSlice.actions

export const selectDeckGlViewState = (state: RootState) => {
  return state.view;
}

export default viewSlice.reducer