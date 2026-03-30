import { MapContainer, TileLayer } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Props = {
  tileUrl: string
}

//const center: LatLngExpression = [41.1189, 1.2445]

export default function MapView({ tileUrl }: Props) {
  return (
    <MapContainer
      //zoom={13}
      //style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer url={tileUrl} />
    </MapContainer>
  )
}
