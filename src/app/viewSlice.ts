import {MapViewState} from '@deck.gl/core/typed';

import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type ViewState = {
  latitude: number,
  longitude: number,
  zoom: number,
  transitionDuration?: number | "auto",
  bearing?: number,
  pitch?: number
}

const initialState: ViewState = {
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
    setViewState: (_state, action) => {
      return action.payload;
    },
  },
})

export const viewStateToDeckGL = (viewState: ViewState): MapViewState => {
  return {
    ...viewState
  };
}

export const deckGLToViewState = (mapViewState: MapViewState): ViewState => {
  return {
    latitude: mapViewState.latitude,
    longitude: mapViewState.longitude,
    zoom: mapViewState.zoom,
    transitionDuration: mapViewState.transitionDuration,
    bearing: mapViewState.bearing,
    pitch: mapViewState.pitch
  };
}

export const { zoomIn, zoomOut, setViewState } = viewSlice.actions

export const selectViewState = (state: RootState): ViewState => state.view;

export const selectDeckGlViewState = createSelector([selectViewState], (viewState: ViewState) => {
  return viewStateToDeckGL(viewState);
})

export default viewSlice.reducer