import './App.css'

import { useEffect } from 'react';
import DeckGL, {TileLayer, BitmapLayer, IconLayer, MapViewState} from 'deck.gl/typed';
import {StaticMap, MapContext} from 'react-map-gl';
import {BASEMAP} from '@deck.gl/carto';

import { ZoomControls } from '../features/zoomControl/ZoomControl';
import { useDispatch, useSelector } from 'react-redux';
import { deckGLToViewState, selectDeckGlViewState, setViewState, zoomIn, zoomOut } from './viewSlice';
import { startConnecting } from './signalkSlice';
import { selectDeckGlIconData } from '../features/vessels/vesselsSlice';

const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
};

function App() {
  const dispatch = useDispatch();

  const layers = [
    new TileLayer({
      data: 'http://192.168.0.72:3000/signalk/v1/api/resources/charts/ncds_19c/{z}/{x}/{y}',
  
      minZoom: 0,
      maxZoom: 16,
      tileSize: 256,
  
      renderSubLayers: props => {
        const {
          bbox: {west, south, east, north}
        } = props.tile;
  
        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north]
        });
      }
    }),
    new IconLayer({
      id: 'vessels-layer',
      data: useSelector(selectDeckGlIconData),
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
  
      sizeScale: 15,
      getPosition: d => d.coordinates,
      getSize: d => 5,
      getColor: d => [0, 140, 0]
    }),
  ];

  const onZoomIn = () => {
    dispatch(zoomIn());
  };
  const onZoomOut = () => {
    dispatch(zoomOut());
  };

  useEffect(() => {
    // Establish SignalK connection
    dispatch(startConnecting());
    console.log("I have been mounted");
  }, [])

  const deckGlViewState = useSelector(selectDeckGlViewState);

  return (
    <div>
      <DeckGL
        viewState={{...deckGlViewState}}
        onViewStateChange={e => dispatch(setViewState(deckGLToViewState(e.viewState as MapViewState)))}
        controller={true}
        layers={layers}
        ContextProvider={MapContext.Provider}
      >
        <StaticMap mapStyle={BASEMAP.VOYAGER} />
      </DeckGL>
      <ZoomControls onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
    </div>
  );
}

export default App;
