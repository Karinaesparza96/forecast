import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { Localidade, LocalizationBR } from '../models/LocalidadesBR';
import { Forecast, TemperatureData } from '../models/Forecast';

@Injectable({
  providedIn: 'root',
})
export class ForecastClimaService {
  constructor(private http: HttpClient) { }

  getLocalizacao() {
    return this.http.get<LocalizationBR>('assets/data/localization.json').pipe(
      map((res) => {
        const data = res.features;
        return data.map((item) => new Localidade(item));
      })
    );
  }

  getForecast(lat: number, long: number): Observable<TemperatureData[]> {
    const baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
    return this.http.get<Forecast>(baseUrl).pipe(
      map((data: Forecast) => {
        return data.hourly.time.map(
          (time, i) => new TemperatureData(time, data.hourly.temperature_2m[i])
        );
      })
    );
  }
}
