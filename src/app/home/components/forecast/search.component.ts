import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, debounceTime, map, switchMap, startWith, of } from 'rxjs';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { TemperatureData } from 'src/app/models/Forecast';

import { Localidade } from 'src/app/models/LocalidadesBR';
import { ForecastClimaService } from 'src/app/services/climatempo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  constructor(private forecastClimaService: ForecastClimaService) { }
  localidades: Localidade[] = [];
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions?: Highcharts.Options;

  lineChart!: Chart;
  searchControl: FormControl = new FormControl('');
  filteredOptions$?: Observable<Localidade[]>;

  ngOnInit(): void {
    this.forecastClimaService
      .getLocalizacao()
      .subscribe((data) => (this.localidades = data));
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
        .getForecast(latitude, longitude)
        .subscribe((temperatureData: TemperatureData[]) => {
          let series = [];
          temperatureData.forEach(element => {
            series.push(element.serie)
          });
          console.log(series)
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
}
