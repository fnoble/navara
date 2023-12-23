import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface VesselState {
    latitude: number;
    longitude: number;
}

export interface VesselsState {
    vessels: {[id: string]: VesselState};
}
 
const initialState: VesselsState = {
    vessels: {},
};
 
const vesselsSlice = createSlice({
  name: 'vessels',
  initialState,
  reducers: {
    applySignalKDelta: (state, action) => {
        const id = action.payload.context;
        for (const update of action.payload.updates) {
            for (const val of update.values) {
                if (val.path == "navigation.position") {
                    state.vessels[id] = val.value;
                }
            }
        }
    },
  },
});

export const selectDeckGlIconData = (state: RootState) => {
    const vessels = state.vessels.vessels;
    return Object.keys(vessels).map(
        (id) => { return {
            name: id, coordinates: [vessels[id].longitude, vessels[id].latitude]
        }}
    );
}

export const { applySignalKDelta } = vesselsSlice.actions
 
export default vesselsSlice.reducer;