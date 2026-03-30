import MapView from '../components/Map/MapView'

export default function RealMap() {
  return (
    <MapView tileUrl="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
  )
}