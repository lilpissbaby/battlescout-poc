import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import type { LatticeEntity, Disposition } from '../../data/mockEntities'
import { mockEntities } from '../../data/mockEntities'
// ── Colores por disposición ───────────────────────────────────────────────────
const DISPOSITION_COLOR: Record<Disposition, string> = {
  DISPOSITION_FRIENDLY:        '#00aaff',
  DISPOSITION_HOSTILE:         '#ff2222',
  DISPOSITION_NEUTRAL:         '#ffffff',
  DISPOSITION_SUSPICIOUS:      '#ffaa00',
  DISPOSITION_ASSUMED_FRIENDLY:'#00ffaa',
}

// ── Icono SVG táctico por tipo ────────────────────────────────────────────────
function buildIcon(entity: LatticeEntity): L.DivIcon {
  const template  = entity.ontology?.template ?? 'TEMPLATE_GEO'
  const platform  = entity.ontology?.platform_type ?? ''
  const disp      = entity.milView?.disposition ?? 'DISPOSITION_NEUTRAL'
  const color     = DISPOSITION_COLOR[disp] ?? '#ffffff'

  let shape = ''

  if (template === 'TEMPLATE_ASSET' || template === 'TEMPLATE_TRACK') {
    // Diamante para hostile/suspicious, círculo para el resto
    if (disp === 'DISPOSITION_HOSTILE' || disp === 'DISPOSITION_SUSPICIOUS') {
      shape = `<polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="${color}" stroke-width="2"/>`
    } else {
      shape = `<circle cx="12" cy="12" r="9" fill="none" stroke="${color}" stroke-width="2"/>`
    }
    // símbolo interior
    if (platform === 'UAV' || platform === 'Airplane' || platform === 'Animal') {
      shape += `<line x1="6" y1="12" x2="18" y2="12" stroke="${color}" stroke-width="1.5"/>
                <line x1="12" y1="7" x2="12" y2="17" stroke="${color}" stroke-width="1.5"/>`
    } else if (platform === 'Submarine') {
      shape += `<path d="M6 14 Q12 8 18 14" fill="none" stroke="${color}" stroke-width="1.5"/>`
    } else if (platform === 'Radar') {
      shape += `<path d="M12 12 L8 7 M12 12 L16 7 M12 12 L12 6" fill="none" stroke="${color}" stroke-width="1.5"/>`
    } else if (platform === 'Vehicle') {
      shape += `<rect x="7" y="9" width="10" height="6" fill="none" stroke="${color}" stroke-width="1.5"/>`
    }
  } else if (template === 'TEMPLATE_SENSOR_POINT_OF_INTEREST') {
    shape = `<circle cx="12" cy="12" r="9" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="3,2"/>
             <circle cx="12" cy="12" r="3" fill="${color}"/>`
  } else {
    // Geo point
    shape = `<circle cx="12" cy="12" r="5" fill="${color}" opacity="0.8"/>`
  }

  const label = entity.aliases?.name ?? entity.description
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      ${shape}
    </svg>`

  return L.divIcon({
    html: `
      <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
        ${svg}
        <span style="
          position:absolute;top:26px;
          white-space:nowrap;
          font-family:'Share Tech Mono',monospace;
          font-size:10px;
          color:${color};
          background:rgba(0,0,0,0.65);
          padding:1px 4px;
          border:1px solid ${color}33;
          pointer-events:none;
        ">${label}</span>
      </div>`,
    className: '',
    iconSize:   [24, 24],
    iconAnchor: [12, 12],
  })
}

// ── Popup HTML ────────────────────────────────────────────────────────────────
function buildPopup(e: LatticeEntity): string {
  const rows = [
    ['Template',     e.ontology?.template ?? '—'],
    ['Platform',     e.ontology?.platform_type ?? '—'],
    ['Disposition',  e.milView?.disposition ?? '—'],
    ['Environment',  e.milView?.environment ?? '—'],
    ['Integration',  e.provenance.integrationName],
    ['Entity ID',    e.entityId.slice(0, 8) + '…'],
  ]
  return `
    <div style="font-family:'Share Tech Mono',monospace;font-size:11px;min-width:200px;background:#0a0a0a;color:#ccc;padding:8px;border:1px solid #333;">
      <div style="font-size:13px;font-weight:bold;color:#fff;margin-bottom:6px;">${e.aliases?.name ?? e.description}</div>
      ${rows.map(([k,v]) => `
        <div style="display:flex;justify-content:space-between;gap:12px;padding:2px 0;border-bottom:1px solid #1a1a1a;">
          <span style="color:#666;">${k}</span>
          <span style="color:#aaa;text-align:right;">${v}</span>
        </div>`).join('')}
    </div>`
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function LatticeLayer() {
  const map     = useMap()
  const layerRef = useRef<L.LayerGroup | null>(null)

  useEffect(() => {
    const group = L.layerGroup().addTo(map)
    layerRef.current = group

    for (const entity of mockEntities) {
      const template = entity.ontology?.template ?? ''

      // ── Marker (asset / track / sensor / geo-point) ─────────────────────
      if (entity.location?.position && template !== 'TEMPLATE_GEO') {
        const { latitudeDegrees: lat, longitudeDegrees: lng } = entity.location.position
        L.marker([lat, lng], { icon: buildIcon(entity) })
          .bindPopup(buildPopup(entity), { className: 'lattice-popup' })
          .addTo(group)
      }

      // ── Geo-point ───────────────────────────────────────────────────────
      if (entity.geoShape?.point) {
        const { latitudeDegrees: lat, longitudeDegrees: lng } = entity.geoShape.point.position
        L.marker([lat, lng], { icon: buildIcon(entity) })
          .bindPopup(buildPopup(entity), { className: 'lattice-popup' })
          .addTo(group)
      }

      // ── Geo-line ────────────────────────────────────────────────────────
      if (entity.geoShape?.line) {
        const latlngs = entity.geoShape.line.positions.map(
          p => [p.latitudeDegrees, p.longitudeDegrees] as [number, number]
        )
        L.polyline(latlngs, { color: '#ffff00', weight: 2, dashArray: '6 4', opacity: 0.85 })
          .bindPopup(buildPopup(entity), { className: 'lattice-popup' })
          .addTo(group)
        // arrowhead en cada segmento
        latlngs.forEach((pt, i) => {
          if (i === latlngs.length - 1) {
            L.circleMarker(pt, { radius: 4, color: '#ffff00', fillColor: '#ffff00', fillOpacity: 1, weight: 0 })
              .addTo(group)
          }
        })
      }

      // ── Geo-polygon ─────────────────────────────────────────────────────
      if (entity.geoShape?.polygon) {
        const latlngs = entity.geoShape.polygon.rings[0].positions.map(
          p => [p.position.latitudeDegrees, p.position.longitudeDegrees] as [number, number]
        )
        L.polygon(latlngs, { color: '#ff4400', weight: 2, fillColor: '#ff4400', fillOpacity: 0.12 })
          .bindPopup(buildPopup(entity), { className: 'lattice-popup' })
          .addTo(group)
        // label centrado
        const center = latlngs.reduce(
          (acc, p) => [acc[0] + p[0] / latlngs.length, acc[1] + p[1] / latlngs.length],
          [0, 0]
        )
        L.marker(center as [number, number], {
          icon: L.divIcon({
            html: `<span style="font-family:'Share Tech Mono',monospace;font-size:10px;color:#ff4400;background:rgba(0,0,0,0.6);padding:1px 4px;white-space:nowrap;">${entity.aliases?.name}</span>`,
            className: '',
            iconAnchor: [0, 0],
          }),
          interactive: false,
        }).addTo(group)
      }

      // ── Geo-ellipse (aproximado con circle) ─────────────────────────────
      if (entity.geoShape?.ellipse && entity.location?.position) {
        const { latitudeDegrees: lat, longitudeDegrees: lng } = entity.location.position
        const { semiMajorAxisM } = entity.geoShape.ellipse
        L.circle([lat, lng], {
          radius: semiMajorAxisM,
          color: '#00aaff',
          weight: 1.5,
          dashArray: '4 3',
          fillColor: '#00aaff',
          fillOpacity: 0.06,
        })
          .bindPopup(buildPopup(entity), { className: 'lattice-popup' })
          .addTo(group)
      }
    }

    return () => { group.clearLayers(); map.removeLayer(group) }
  }, [map])

  return null
}
