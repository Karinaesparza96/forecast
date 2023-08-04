export interface LocalizationBR {
  features: Feature[];

}

export interface Feature {
  geometry: Geometry;
  properties: Properties;

}

export interface Geometry {
  coordinates: number[];

}

export interface Properties {
  description: string;
  name: string;
}

export class Localidade {
  latitude?: number
  longitude?: number
  localidade?: string
  constructor(feature: Feature) {
    if (feature.geometry.coordinates && feature.geometry.coordinates.length > 2) {
      this.longitude = feature.geometry.coordinates[0]
      this.latitude = feature.geometry.coordinates[1]
      this.localidade = feature.properties.name
    }

  }
}





