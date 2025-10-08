
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapPlaceholder() {
  return (
    <p>
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

const Map = ({longitude, latitute}) => {
  
  return (
    <MapContainer 
      center={[latitute, longitude]} 
      zoom={4} 
      style={{ height: "400px", width: "800px" }}  
      scrollWheelZoom={false}
      placeholder={<MapPlaceholder />}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitute, longitude]}></Marker>
    </MapContainer>
  )
}

export default Map