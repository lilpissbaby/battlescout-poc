import { v4 as uuidv4 } from 'uuid'

export type Disposition =
  | 'DISPOSITION_FRIENDLY'
  | 'DISPOSITION_HOSTILE'
  | 'DISPOSITION_NEUTRAL'
  | 'DISPOSITION_SUSPICIOUS'
  | 'DISPOSITION_ASSUMED_FRIENDLY'

export type Environment =
  | 'ENVIRONMENT_AIR'
  | 'ENVIRONMENT_SURFACE'
  | 'ENVIRONMENT_SUB_SURFACE'
  | 'ENVIRONMENT_SPACE'

export type Template =
  | 'TEMPLATE_ASSET'
  | 'TEMPLATE_TRACK'
  | 'TEMPLATE_GEO'
  | 'TEMPLATE_SENSOR_POINT_OF_INTEREST'
  | 'TEMPLATE_SIGNAL_OF_INTEREST'

export type GeoType =
  | 'GEO_TYPE_GENERAL'
  | 'GEO_TYPE_CONTROL_AREA'

export interface LatticeEntity {
  entityId: string
  description: string
  isLive: boolean
  expiryTime: string
  aliases?: { name: string }
  provenance: {
    integrationName: string
    dataType: string
    sourceUpdateTime: string
  }
  ontology?: {
    template: Template
    platform_type?: string
  }
  location?: {
    position: {
      latitudeDegrees: number
      longitudeDegrees: number
      altitudeHaeMeters?: number
    }
  }
  milView?: {
    disposition: Disposition
    environment: Environment
  }
  geoShape?: {
    point?: {
      position: { latitudeDegrees: number; longitudeDegrees: number }
    }
    polygon?: {
      rings: Array<{
        positions: Array<{ position: { latitudeDegrees: number; longitudeDegrees: number } }>
      }>
    }
    line?: {
      positions: Array<{ latitudeDegrees: number; longitudeDegrees: number }>
    }
    ellipse?: {
      semiMajorAxisM: number
      semiMinorAxisM: number
      orientationD: number
    }
  }
  geoDetails?: { type: GeoType }
}

const now = new Date().toISOString()
const expiry = new Date(Date.now() + 30 * 60 * 1000).toISOString()

// Centre around Reus / Camp de Tarragona
const BASE_LAT = 41.1189
const BASE_LON = 1.2445

export const mockEntities: LatticeEntity[] = [
  // ── ASSETS ────────────────────────────────────────────────────────────────
  {
    entityId: uuidv4(),
    description: 'Asset',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'Alpha-1 UAV' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'UAV' },
    location: { position: { latitudeDegrees: BASE_LAT + 0.03, longitudeDegrees: BASE_LON + 0.05, altitudeHaeMeters: 150 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uuidv4(),
    description: 'Asset',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'Bravo-2 Radar' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Radar' },
    location: { position: { latitudeDegrees: BASE_LAT - 0.02, longitudeDegrees: BASE_LON - 0.04 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uuidv4(),
    description: 'Asset',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'Charlie-3 Sub' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Submarine' },
    location: { position: { latitudeDegrees: BASE_LAT - 0.06, longitudeDegrees: BASE_LON + 0.09 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_SUB_SURFACE' },
  },

  // ── TRACKS ────────────────────────────────────────────────────────────────
  {
    entityId: uuidv4(),
    description: 'Track',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'TRK-001 Airplane' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Airplane' },
    location: { position: { latitudeDegrees: BASE_LAT + 0.07, longitudeDegrees: BASE_LON - 0.06, altitudeHaeMeters: 3000 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uuidv4(),
    description: 'Track',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'TRK-002 Vehicle' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Vehicle' },
    location: { position: { latitudeDegrees: BASE_LAT + 0.01, longitudeDegrees: BASE_LON + 0.02 } },
    milView: { disposition: 'DISPOSITION_SUSPICIOUS', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uuidv4(),
    description: 'Track',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'TRK-003 Neutral Bird' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Animal' },
    location: { position: { latitudeDegrees: BASE_LAT - 0.04, longitudeDegrees: BASE_LON + 0.01 } },
    milView: { disposition: 'DISPOSITION_NEUTRAL', environment: 'ENVIRONMENT_AIR' },
  },

  // ── SENSOR POI ────────────────────────────────────────────────────────────
  {
    entityId: uuidv4(),
    description: 'Sensor',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'SPI Radar North' },
    provenance: { integrationName: 'battlescout', dataType: 'sensor', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_SENSOR_POINT_OF_INTEREST', platform_type: 'Radar' },
    location: { position: { latitudeDegrees: BASE_LAT + 0.05, longitudeDegrees: BASE_LON - 0.02 } },
    milView: { disposition: 'DISPOSITION_ASSUMED_FRIENDLY', environment: 'ENVIRONMENT_SURFACE' },
  },

  // ── GEO — POINT ───────────────────────────────────────────────────────────
  {
    entityId: uuidv4(),
    description: 'Geo point',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'CP Alpha' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: { point: { position: { latitudeDegrees: BASE_LAT + 0.02, longitudeDegrees: BASE_LON - 0.03 } } },
    geoDetails: { type: 'GEO_TYPE_GENERAL' },
  },

  // ── GEO — LINE ────────────────────────────────────────────────────────────
  {
    entityId: uuidv4(),
    description: 'Geo line',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'Patrol Route Bravo' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      line: {
        positions: [
          { latitudeDegrees: BASE_LAT - 0.01, longitudeDegrees: BASE_LON - 0.05 },
          { latitudeDegrees: BASE_LAT + 0.01, longitudeDegrees: BASE_LON - 0.01 },
          { latitudeDegrees: BASE_LAT + 0.03, longitudeDegrees: BASE_LON + 0.03 },
          { latitudeDegrees: BASE_LAT + 0.02, longitudeDegrees: BASE_LON + 0.07 },
        ],
      },
    },
    geoDetails: { type: 'GEO_TYPE_GENERAL' },
  },

  // ── GEO — POLYGON ─────────────────────────────────────────────────────────
  {
    entityId: uuidv4(),
    description: 'Geo polygon',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'Exclusion Zone Alpha' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      polygon: {
        rings: [{
          positions: [
            { position: { latitudeDegrees: BASE_LAT + 0.05, longitudeDegrees: BASE_LON + 0.04 } },
            { position: { latitudeDegrees: BASE_LAT + 0.08, longitudeDegrees: BASE_LON + 0.06 } },
            { position: { latitudeDegrees: BASE_LAT + 0.07, longitudeDegrees: BASE_LON + 0.10 } },
            { position: { latitudeDegrees: BASE_LAT + 0.04, longitudeDegrees: BASE_LON + 0.08 } },
            { position: { latitudeDegrees: BASE_LAT + 0.05, longitudeDegrees: BASE_LON + 0.04 } },
          ],
        }],
      },
    },
    geoDetails: { type: 'GEO_TYPE_CONTROL_AREA' },
  },

  // ── GEO — ELLIPSE ─────────────────────────────────────────────────────────
  {
    entityId: uuidv4(),
    description: 'Geo ellipse',
    isLive: true,
    expiryTime: expiry,
    aliases: { name: 'Radar Coverage Zone' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    location: { position: { latitudeDegrees: BASE_LAT - 0.02, longitudeDegrees: BASE_LON - 0.04 } },
    geoShape: { ellipse: { semiMajorAxisM: 2000, semiMinorAxisM: 1200, orientationD: 45 } },
    geoDetails: { type: 'GEO_TYPE_CONTROL_AREA' },
  },
]
