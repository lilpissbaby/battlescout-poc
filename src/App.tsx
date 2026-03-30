import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import OSMMap from './pages/OSMMap'
import DarkMap from './pages/DarkMap'
import TopoMap from './pages/TopoMap'
import StamenMap from './pages/StamenMap'
import HikeMap from './pages/HikeMap'
import RealMap from './pages/RealMap'

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: 'absolute', zIndex: 1000, padding: 10 }}>
        <Link to="/">OSM</Link> |{" "}
        <Link to="/dark">Dark</Link> |{" "}
        <Link to="/topo">Topo</Link> |{" "}
        <Link to="/stamen">Stamen</Link> |{" "}
        <Link to="/hike">Hike</Link> |{" "}
        <Link to="/real">Real</Link>
      </div>

      <Routes>
        <Route path="/" element={<OSMMap />} />
        <Route path="/dark" element={<DarkMap />} />
        <Route path="/topo" element={<TopoMap />} />
        <Route path="/stamen" element={<StamenMap />} />
        <Route path="/hike" element={<HikeMap />} />
        <Route path="/real" element={<RealMap />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App