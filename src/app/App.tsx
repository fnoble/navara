import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';

import DeckGL, {TileLayer, BitmapLayer} from 'deck.gl/typed';
import styled from 'styled-components';
import { ChartsList } from '../features/charts/Charts';
import { ZoomControls } from '../features/zoomControl/ZoomControl';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeckGlViewState, setDeckGlViewState, zoomIn, zoomOut } from './viewSlice';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10
};

const Menu = styled.div`
  position: absolute;
  top: 50px;
  left: 10px;
  background: white;
`;

function App() {
  const dispatch = useDispatch();

  const layers = [
    new TileLayer({
      // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
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
      >
        <Menu>
          Testing 123
          <br />
          <ChartsList /> 
          <br />
          <Button variant="contained">Hello world</Button>
        </Menu>
      </DeckGL>
      <ZoomControls onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
    </div>
  );
}

export default App;
