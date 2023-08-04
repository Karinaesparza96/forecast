import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';

import { Observable, debounceTime, map, switchMap, startWith, of, Subject, takeUntil } from 'rxjs';

import { TemperatureData } from 'src/app/models/Forecast';
import { Localidade } from 'src/app/models/LocalidadesBR';
import { ForecastClimaService } from 'src/app/services/climatempo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(private forecastClimaService: ForecastClimaService) { }

  localidades: Localidade[] = [];
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions?: Highcharts.Options;
  destroy$ = new Subject<void>()

  lineChart!: Chart;
  searchControl: FormControl = new FormControl('');
  filteredOptions$?: Observable<Localidade[]>;

  ngOnInit(): void {
    this.getLocalidades();
    this.initFilteredOptions();
  }

  private getLocalidades(): void {
    this.forecastClimaService
      .getLocalizacao()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.localidades = data));
  }

  private initFilteredOptions(): void {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith('a'),
      debounceTime(400),
      switchMap((value) => {
        const localizacaoBr =
          typeof value === 'string' ? value : value?.localidade;
        return this._filter(localizacaoBr as string);
      })
    );
  }

  displayFn(option: Localidade): string {
    return option && option.localidade ? option.localidade : '';
  }

  onSelectionChange(event: any) {
    const { latitude, longitude } = event.option.value;
    if (latitude && longitude) {
      this.forecastClimaService
        .getForecast(latitude, longitude).
        pipe(takeUntil(this.destroy$))
        .subscribe((temperatureData: TemperatureData[]) => {
          let series = [];
          temperatureData.forEach(element => {
            series.push(element.serie)
          });
          this.setChartOptions(series);
        });
    }
  }

  setChartOptions(series) {
    this.chartOptions = {
      chart: {
        type: 'line',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: 'Temperatura semanal',
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'temperatura em °C',
        },
      },
      series: [
        {
          name: 'temperatura dia',
          data: series,
          type: 'spline',
        },
      ],
    };
  }

  private _filter(localizacaoBr: string): Observable<Localidade[]> {
    const filterValue = localizacaoBr.toLowerCase();

    return of(this.localidades).pipe(
      map((items) => {
        const startsWithFilter = items.filter((item) =>
          item.localidade?.toLowerCase().startsWith(filterValue)
        );
        const includesFilter = items.filter(
          (item) =>
            item.localidade?.toLowerCase().includes(filterValue) &&
            !startsWithFilter.includes(item)
        );
        const combineOptions = startsWithFilter.concat(includesFilter);

        let length = 20;
        if (combineOptions.length > length) {
          return combineOptions.slice(0, length);
        }
        return combineOptions;
      })
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
