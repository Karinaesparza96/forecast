export interface Forecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
}

export class TemperatureData {
  time: string;
  temperatura: number;
  serie: any[] = []


  constructor(time: string, temperatura: number) {
    this.time = time;
    this.temperatura = temperatura;
    this.serie.push(new Date(time).getTime());
    this.serie.push(temperatura);
  }
}