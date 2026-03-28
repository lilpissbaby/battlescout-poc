import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type Props = {
  tileUrl: string
}

export default function MapView({ tileUrl }: Props) {
  return (
    <MapContainer
      center={[41.1189, 1.2445]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer url={tileUrl} />
    </MapContainer>
  )
}