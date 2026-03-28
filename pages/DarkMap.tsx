import MapView from '../src/components/Map/MapView'

export default function DarkMap() {
  return (
    <MapView tileUrl="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
  )
}