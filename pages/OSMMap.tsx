import MapView from '../src/components/Map/MapView'

export default function OSMMap() {
  return (
    <MapView tileUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  )
}