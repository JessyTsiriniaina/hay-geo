
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapPlaceholder() {
  return (
    <p>
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

const WorldMap = ({longitude, latitude }) => {

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-blue-50 text-gray-900
                        shadow-sm overflow-hidden transition-all duration-300 
                        hover:shadow-[0 10px 15px -3px hsl(205 87% 45% / 0.15), 0 4px 6px -2px hsl(205 87% 45% / 0.08)] 
                        shadow-[0 4px 6px -1px hsl(205 87% 45% / 0.1), 0 2px 4px -1px hsl(205 87% 45% / 0.06)]"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">
              Location
            </p>
          </div>
        </div>
        <div className="p-6 pt-0 pt-6">
          <MapContainer
            center={[latitude, longitude]}
            zoom={4}
            className='h-[400px] w-full relative'
            scrollWheelZoom={false}
            placeholder={<MapPlaceholder />}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}></Marker>
          </MapContainer>

        </div>

      </div>
    </>
  )
}

export default WorldMap