import MapView from '../src/components/Map/MapView'

export default function StamenMap() {
  return (
    <MapView tileUrl="https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=e76383f883884ba197053c764b128f66" />
  )
}