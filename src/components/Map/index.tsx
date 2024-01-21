import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapboxGl, { Feature, Layer } from 'react-mapbox-gl';

const accessToken = process.env.NEXT_PUBLIC_Mapbox_Secret as string;
const Map = ReactMapboxGl({
  accessToken: accessToken
});
const MapComponent = () => {
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100%',
        width: '100%'
      }}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[23.685, 90.3563]} />
      </Layer>
    </Map>
  );
};

export default MapComponent;
