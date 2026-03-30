import MapView from '../components/Map/MapView'

export default function HikeMap() {
  return (
    <MapView tileUrl="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"/>
  )
}