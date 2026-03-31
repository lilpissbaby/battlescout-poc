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
    point?: { position: { latitudeDegrees: number; longitudeDegrees: number } }
    polygon?: {
      rings: Array<{
        positions: Array<{ position: { latitudeDegrees: number; longitudeDegrees: number } }>
      }>
    }
    line?: { positions: Array<{ latitudeDegrees: number; longitudeDegrees: number }> }
    ellipse?: { semiMajorAxisM: number; semiMinorAxisM: number; orientationD: number }
  }
  geoDetails?: { type: GeoType }
}

let _id = 1
const uid = () => `entity-${String(_id++).padStart(4, '0')}`
const now = new Date().toISOString()
const expiry = new Date(Date.now() + 60 * 60 * 1000).toISOString()

export const mockEntities: LatticeEntity[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // UCRANIA — Frente Este
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'UA-UAV Bayraktar Alpha' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'UAV' },
    location: { position: { latitudeDegrees: 47.85, longitudeDegrees: 37.57, altitudeHaeMeters: 800 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'RU-TRK Kalibr Launch' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Missile' },
    location: { position: { latitudeDegrees: 48.10, longitudeDegrees: 38.20, altitudeHaeMeters: 200 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'UA-Radar Zaporizhzhia' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Radar' },
    location: { position: { latitudeDegrees: 47.83, longitudeDegrees: 35.14 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Geo polygon', isLive: true, expiryTime: expiry,
    aliases: { name: 'Donetsk Contested Zone' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      polygon: {
        rings: [{
          positions: [
            { position: { latitudeDegrees: 48.10, longitudeDegrees: 37.50 } },
            { position: { latitudeDegrees: 48.30, longitudeDegrees: 38.20 } },
            { position: { latitudeDegrees: 47.70, longitudeDegrees: 38.50 } },
            { position: { latitudeDegrees: 47.50, longitudeDegrees: 37.80 } },
            { position: { latitudeDegrees: 48.10, longitudeDegrees: 37.50 } },
          ],
        }],
      },
    },
    geoDetails: { type: 'GEO_TYPE_CONTROL_AREA' },
  },
  {
    entityId: uid(), description: 'Geo line', isLive: true, expiryTime: expiry,
    aliases: { name: 'UA Front Line East' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      line: {
        positions: [
          { latitudeDegrees: 49.00, longitudeDegrees: 37.00 },
          { latitudeDegrees: 48.50, longitudeDegrees: 37.80 },
          { latitudeDegrees: 47.90, longitudeDegrees: 38.20 },
          { latitudeDegrees: 47.20, longitudeDegrees: 38.90 },
        ],
      },
    },
    geoDetails: { type: 'GEO_TYPE_GENERAL' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // IRAN / GOLFO PERSICO — Operacion Epic Fury
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'USS Nimitz CVN-68' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Carrier' },
    location: { position: { latitudeDegrees: 25.50, longitudeDegrees: 57.20 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'F-35 Strike Package Alpha' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Airplane' },
    location: { position: { latitudeDegrees: 27.00, longitudeDegrees: 55.50, altitudeHaeMeters: 9000 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'IR Shahab-3 Launch' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Missile' },
    location: { position: { latitudeDegrees: 32.50, longitudeDegrees: 53.00, altitudeHaeMeters: 5000 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'IR Frigate Sahand' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Ship' },
    location: { position: { latitudeDegrees: 26.80, longitudeDegrees: 56.30 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Geo ellipse', isLive: true, expiryTime: expiry,
    aliases: { name: 'Strait of Hormuz Exclusion Zone' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    location: { position: { latitudeDegrees: 26.57, longitudeDegrees: 56.46 } },
    geoShape: { ellipse: { semiMajorAxisM: 55000, semiMinorAxisM: 30000, orientationD: 120 } },
    geoDetails: { type: 'GEO_TYPE_CONTROL_AREA' },
  },
  {
    entityId: uid(), description: 'Sensor', isLive: true, expiryTime: expiry,
    aliases: { name: 'SPI Bandar Abbas Port' },
    provenance: { integrationName: 'battlescout', dataType: 'sensor', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_SENSOR_POINT_OF_INTEREST', platform_type: 'Radar' },
    location: { position: { latitudeDegrees: 27.18, longitudeDegrees: 56.27 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_SURFACE' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // YEMEN — Houthis / Mar Rojo
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'Houthi Drone Swarm #7' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'UAV' },
    location: { position: { latitudeDegrees: 15.35, longitudeDegrees: 42.80, altitudeHaeMeters: 300 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'HMS Diamond D34' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Ship' },
    location: { position: { latitudeDegrees: 13.50, longitudeDegrees: 43.50 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Geo polygon', isLive: true, expiryTime: expiry,
    aliases: { name: 'Red Sea Danger Zone' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      polygon: {
        rings: [{
          positions: [
            { position: { latitudeDegrees: 20.00, longitudeDegrees: 38.00 } },
            { position: { latitudeDegrees: 20.00, longitudeDegrees: 45.00 } },
            { position: { latitudeDegrees: 11.00, longitudeDegrees: 45.00 } },
            { position: { latitudeDegrees: 11.00, longitudeDegrees: 38.00 } },
            { position: { latitudeDegrees: 20.00, longitudeDegrees: 38.00 } },
          ],
        }],
      },
    },
    geoDetails: { type: 'GEO_TYPE_CONTROL_AREA' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ISRAEL / GAZA / LIBANO
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'IDF F-16 Bravo Flight' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Airplane' },
    location: { position: { latitudeDegrees: 31.50, longitudeDegrees: 34.80, altitudeHaeMeters: 7000 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'Hezbollah Rocket Salvo' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Missile' },
    location: { position: { latitudeDegrees: 33.20, longitudeDegrees: 35.50, altitudeHaeMeters: 1000 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Geo point', isLive: true, expiryTime: expiry,
    aliases: { name: 'Gaza Ceasefire Line' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: { point: { position: { latitudeDegrees: 31.35, longitudeDegrees: 34.30 } } },
    geoDetails: { type: 'GEO_TYPE_GENERAL' },
  },
  {
    entityId: uid(), description: 'Geo line', isLive: true, expiryTime: expiry,
    aliases: { name: 'Lebanon Border LoC' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      line: {
        positions: [
          { latitudeDegrees: 33.07, longitudeDegrees: 35.10 },
          { latitudeDegrees: 33.08, longitudeDegrees: 35.40 },
          { latitudeDegrees: 33.10, longitudeDegrees: 35.65 },
          { latitudeDegrees: 33.25, longitudeDegrees: 35.85 },
        ],
      },
    },
    geoDetails: { type: 'GEO_TYPE_GENERAL' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SUDAN — Guerra SAF vs RSF
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'RSF Armored Column Khartoum' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Vehicle' },
    location: { position: { latitudeDegrees: 15.55, longitudeDegrees: 32.53 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'SAF MiG-29 Khartoum' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Airplane' },
    location: { position: { latitudeDegrees: 15.60, longitudeDegrees: 32.55, altitudeHaeMeters: 5000 } },
    milView: { disposition: 'DISPOSITION_ASSUMED_FRIENDLY', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Geo polygon', isLive: true, expiryTime: expiry,
    aliases: { name: 'Darfur RSF Control Area' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      polygon: {
        rings: [{
          positions: [
            { position: { latitudeDegrees: 16.00, longitudeDegrees: 22.00 } },
            { position: { latitudeDegrees: 16.00, longitudeDegrees: 26.00 } },
            { position: { latitudeDegrees: 12.00, longitudeDegrees: 26.00 } },
            { position: { latitudeDegrees: 12.00, longitudeDegrees: 22.00 } },
            { position: { latitudeDegrees: 16.00, longitudeDegrees: 22.00 } },
          ],
        }],
      },
    },
    geoDetails: { type: 'GEO_TYPE_CONTROL_AREA' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MYANMAR — Guerra Civil
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'Junta Airstrike Mandalay' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Airplane' },
    location: { position: { latitudeDegrees: 21.97, longitudeDegrees: 96.08, altitudeHaeMeters: 3000 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Geo polygon', isLive: true, expiryTime: expiry,
    aliases: { name: 'PDF Resistance Zone Sagaing' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      polygon: {
        rings: [{
          positions: [
            { position: { latitudeDegrees: 23.50, longitudeDegrees: 94.50 } },
            { position: { latitudeDegrees: 23.50, longitudeDegrees: 96.00 } },
            { position: { latitudeDegrees: 22.00, longitudeDegrees: 96.00 } },
            { position: { latitudeDegrees: 22.00, longitudeDegrees: 94.50 } },
            { position: { latitudeDegrees: 23.50, longitudeDegrees: 94.50 } },
          ],
        }],
      },
    },
    geoDetails: { type: 'GEO_TYPE_CONTROL_AREA' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAKISTAN / AFGANISTAN — Operacion Ghazab
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'PAK F-16 Strike Alpha' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Airplane' },
    location: { position: { latitudeDegrees: 34.52, longitudeDegrees: 69.17, altitudeHaeMeters: 8000 } },
    milView: { disposition: 'DISPOSITION_SUSPICIOUS', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'AFG Retaliatory Drone' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'UAV' },
    location: { position: { latitudeDegrees: 33.72, longitudeDegrees: 70.90, altitudeHaeMeters: 400 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Geo line', isLive: true, expiryTime: expiry,
    aliases: { name: 'Durand Line Contested' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      line: {
        positions: [
          { latitudeDegrees: 37.00, longitudeDegrees: 71.50 },
          { latitudeDegrees: 35.50, longitudeDegrees: 72.00 },
          { latitudeDegrees: 34.00, longitudeDegrees: 70.50 },
          { latitudeDegrees: 31.50, longitudeDegrees: 69.00 },
          { latitudeDegrees: 29.50, longitudeDegrees: 66.50 },
        ],
      },
    },
    geoDetails: { type: 'GEO_TYPE_GENERAL' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DRC / CONGO — M23 / Rwanda
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'M23 Column Goma' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Vehicle' },
    location: { position: { latitudeDegrees: -1.68, longitudeDegrees: 29.22 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Geo polygon', isLive: true, expiryTime: expiry,
    aliases: { name: 'M23 Control Zone North Kivu' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      polygon: {
        rings: [{
          positions: [
            { position: { latitudeDegrees: -0.50, longitudeDegrees: 29.00 } },
            { position: { latitudeDegrees: -0.50, longitudeDegrees: 30.00 } },
            { position: { latitudeDegrees: -2.00, longitudeDegrees: 30.00 } },
            { position: { latitudeDegrees: -2.00, longitudeDegrees: 29.00 } },
            { position: { latitudeDegrees: -0.50, longitudeDegrees: 29.00 } },
          ],
        }],
      },
    },
    geoDetails: { type: 'GEO_TYPE_CONTROL_AREA' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ESTRECHO DE TAIWAN — Tension China
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'PLAN Destroyer Nanchang' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Ship' },
    location: { position: { latitudeDegrees: 24.50, longitudeDegrees: 120.80 } },
    milView: { disposition: 'DISPOSITION_SUSPICIOUS', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'USS Ronald Reagan CVN-76' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Carrier' },
    location: { position: { latitudeDegrees: 23.80, longitudeDegrees: 122.50 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'PLAAF J-20 Intercept' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Airplane' },
    location: { position: { latitudeDegrees: 25.10, longitudeDegrees: 121.50, altitudeHaeMeters: 10000 } },
    milView: { disposition: 'DISPOSITION_SUSPICIOUS', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Geo ellipse', isLive: true, expiryTime: expiry,
    aliases: { name: 'Taiwan Strait ADIZ' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    location: { position: { latitudeDegrees: 24.50, longitudeDegrees: 120.50 } },
    geoShape: { ellipse: { semiMajorAxisM: 120000, semiMinorAxisM: 80000, orientationD: 10 } },
    geoDetails: { type: 'GEO_TYPE_CONTROL_AREA' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SAHEL — Mali / Burkina / Niger
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'JNIM Insurgent Cell Bamako' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Vehicle' },
    location: { position: { latitudeDegrees: 14.50, longitudeDegrees: -3.00 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'Wagner Recon UAV Mali' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'UAV' },
    location: { position: { latitudeDegrees: 16.00, longitudeDegrees: -0.50, altitudeHaeMeters: 600 } },
    milView: { disposition: 'DISPOSITION_SUSPICIOUS', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Geo polygon', isLive: true, expiryTime: expiry,
    aliases: { name: 'Sahel Insurgency Belt' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: {
      polygon: {
        rings: [{
          positions: [
            { position: { latitudeDegrees: 18.00, longitudeDegrees: -5.00 } },
            { position: { latitudeDegrees: 18.00, longitudeDegrees: 10.00 } },
            { position: { latitudeDegrees: 12.00, longitudeDegrees: 10.00 } },
            { position: { latitudeDegrees: 12.00, longitudeDegrees: -5.00 } },
            { position: { latitudeDegrees: 18.00, longitudeDegrees: -5.00 } },
          ],
        }],
      },
    },
    geoDetails: { type: 'GEO_TYPE_CONTROL_AREA' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VENEZUELA — Tension EEUU
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'USS Gravely DDG-107' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Ship' },
    location: { position: { latitudeDegrees: 12.50, longitudeDegrees: -67.00 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'VEN Su-30 Scramble' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Airplane' },
    location: { position: { latitudeDegrees: 10.48, longitudeDegrees: -66.88, altitudeHaeMeters: 8000 } },
    milView: { disposition: 'DISPOSITION_SUSPICIOUS', environment: 'ENVIRONMENT_AIR' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BALTICO — NATO vs Rusia
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'NATO AWACS Baltic Eye' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Airplane' },
    location: { position: { latitudeDegrees: 58.50, longitudeDegrees: 22.00, altitudeHaeMeters: 9500 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'RU MiG-31 Estonia Incursion' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Airplane' },
    location: { position: { latitudeDegrees: 59.20, longitudeDegrees: 25.50, altitudeHaeMeters: 8000 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'NATO Submarine Delta' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'Submarine' },
    location: { position: { latitudeDegrees: 57.80, longitudeDegrees: 19.50 } },
    milView: { disposition: 'DISPOSITION_FRIENDLY', environment: 'ENVIRONMENT_SUB_SURFACE' },
  },
  {
    entityId: uid(), description: 'Sensor', isLive: true, expiryTime: expiry,
    aliases: { name: 'SPI Baltic Cable Monitor' },
    provenance: { integrationName: 'battlescout', dataType: 'sensor', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_SENSOR_POINT_OF_INTEREST', platform_type: 'Radar' },
    location: { position: { latitudeDegrees: 57.50, longitudeDegrees: 20.00 } },
    milView: { disposition: 'DISPOSITION_ASSUMED_FRIENDLY', environment: 'ENVIRONMENT_SURFACE' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SIRIA — Fragmentacion post-Assad
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Track', isLive: true, expiryTime: expiry,
    aliases: { name: 'ISIS Cell Deir ez-Zor' },
    provenance: { integrationName: 'battlescout', dataType: 'track', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_TRACK', platform_type: 'Vehicle' },
    location: { position: { latitudeDegrees: 35.33, longitudeDegrees: 40.14 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Asset', isLive: true, expiryTime: expiry,
    aliases: { name: 'TR Drone Bayraktar Syria' },
    provenance: { integrationName: 'battlescout', dataType: 'asset', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_ASSET', platform_type: 'UAV' },
    location: { position: { latitudeDegrees: 36.80, longitudeDegrees: 38.80, altitudeHaeMeters: 1000 } },
    milView: { disposition: 'DISPOSITION_SUSPICIOUS', environment: 'ENVIRONMENT_AIR' },
  },
  {
    entityId: uid(), description: 'Geo point', isLive: true, expiryTime: expiry,
    aliases: { name: 'Aleppo Clashes CP' },
    provenance: { integrationName: 'battlescout', dataType: 'geo', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_GEO' },
    geoShape: { point: { position: { latitudeDegrees: 36.20, longitudeDegrees: 37.16 } } },
    geoDetails: { type: 'GEO_TYPE_GENERAL' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SENALES DE INTERES GLOBALES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    entityId: uid(), description: 'Signal', isLive: true, expiryTime: expiry,
    aliases: { name: 'SOI-GPS Jammer Black Sea' },
    provenance: { integrationName: 'battlescout', dataType: 'signal', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_SIGNAL_OF_INTEREST', platform_type: 'Jammer' },
    location: { position: { latitudeDegrees: 43.00, longitudeDegrees: 34.00 } },
    milView: { disposition: 'DISPOSITION_HOSTILE', environment: 'ENVIRONMENT_SURFACE' },
  },
  {
    entityId: uid(), description: 'Signal', isLive: true, expiryTime: expiry,
    aliases: { name: 'SOI-Radar Emission Hormuz' },
    provenance: { integrationName: 'battlescout', dataType: 'signal', sourceUpdateTime: now },
    ontology: { template: 'TEMPLATE_SIGNAL_OF_INTEREST', platform_type: 'Radar' },
    location: { position: { latitudeDegrees: 26.00, longitudeDegrees: 56.80 } },
    milView: { disposition: 'DISPOSITION_SUSPICIOUS', environment: 'ENVIRONMENT_SURFACE' },
  },
]
