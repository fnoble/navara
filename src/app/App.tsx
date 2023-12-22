import './App.css'

import DeckGL, {TileLayer, BitmapLayer} from 'deck.gl/typed';
import {StaticMap, MapContext} from 'react-map-gl';
import {BASEMAP} from '@deck.gl/carto';

import { ZoomControls } from '../features/zoomControl/ZoomControl';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeckGlViewState, setDeckGlViewState, zoomIn, zoomOut } from './viewSlice';

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
    })
  ];

  const onZoomIn = () => {
    dispatch(zoomIn());
  };
  const onZoomOut = () => {
    dispatch(zoomOut());
  };

  const deckGlViewState = useSelector(selectDeckGlViewState);

  return (
    <div>
      <DeckGL
        viewState={{...deckGlViewState}}
        onViewStateChange={e => dispatch(setDeckGlViewState(e.viewState))}
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
