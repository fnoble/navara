import './App.css'

import {StaticMap, MapContext, NavigationControl} from 'react-map-gl';
import DeckGL, {GeoJsonLayer, ArcLayer, TileLayer, BitmapLayer} from 'deck.gl';
import styled from 'styled-components';
import { ChartsList } from '../features/charts/Charts';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const INITIAL_VIEW_STATE = {
  latitude: 37.77,
  longitude: -122.42,
  zoom: 9,
  bearing: 0,
  pitch: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10
};

const Menu = styled.div`
  position: absolute;
  top: 50;
  left: 10;
  background: white;
`;

function App() {
  const layers = [
    new TileLayer({
      // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
      data: 'http://192.168.0.72:3000/signalk/v1/api/resources/charts/ncds_19c/{z}/{x}/{y}',
  
      minZoom: 0,
      maxZoom: 19,
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

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      ContextProvider={MapContext.Provider}
    >
      <NavigationControl style={NAV_CONTROL_STYLE} />
      <Menu>
        Testing 123
        <br />
        <ChartsList /> 
      </Menu>
    </DeckGL>
  );
}

export default App
