import { Component, Input, SimpleChanges, SimpleChange } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { timer, Subscription, concat, of } from 'rxjs';
import { HealthCheckListEndpointServiceService } from '../health-check-list-endpoint-service.service'
import { merge, switchMap } from 'rxjs/operators';
import { HealthCheckResult } from '../health-check-list/HealthCheckResult';
@Component({
  selector: 'app-health-check-live-chart',
  templateUrl: './health-check-live-chart.component.html',
  styleUrls: ['./health-check-live-chart.component.css']
})
export class HealthCheckLiveChartComponent {
  
  healthCheckService: HealthCheckListEndpointServiceService;

  // initial values
  dataPoints = {};
  colors = ['blue', 'orange', 'purple', 'yellow', 'black', 'magenta', 'cyan'];
  chart: any;
  yValue1 = 0; 
  time;
  updateInterval = 3000;
  timer$ = timer(0, this.updateInterval);
  SUCCESS_VALUE = 5;
  BROKEN_VALUE = 1;
  lastResults;
  subscription: Subscription;

  constructor(healthCheckService: HealthCheckListEndpointServiceService) { 
    this.healthCheckService = healthCheckService;
  }

  @Input() urls: string[];
  ngOnChanges(changes: SimpleChanges): void {
    const urls: SimpleChange = changes.urls;
    if(this.subscription) {
      this.subscription.unsubscribe();
    }

    if(urls.currentValue.length > 0) {
      this.lastResults = [];
      urls.currentValue.forEach(url => {
          let result = HealthCheckResult.CreateDefault();
          result.url = url;
          this.lastResults.push(result);
      });
      this.startListening(urls.currentValue);
    }
  }

  startListening(urls: any): any {
    let data = this.urls.map((url, index) => {
      this.dataPoints[url] = [];

      return { 
        type: "line",
        xValueType: "dateTime",
        lineColor: this.colors[index],
        yValueFormatString: "#",
        xValueFormatString: "hh:mm:ss TT",
        showInLegend: true,
        name: url,
        dataPoints: this.dataPoints[url]
        };
    });

    this.chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Service Live Monitoring"
      },
      axisX: {
        title: "chart updates every 3 secs"
      },
      axisY: {
        minimum: 0,
        maximum: 6,
        interval: 1,
        labelFormatter: (dataObject) => {
          switch(dataObject.value) {
            case this.SUCCESS_VALUE:
              return 'Online';
            case this.BROKEN_VALUE:
              return 'Broken';
            default:
              return '';
          }
        } 
      },
      legend: {
        cursor:"pointer",
        verticalAlign: "top",
        fontSize: 22,
        fontColor: "dimGrey"
      },
      data: data
    });

 
    const source$ = this.timer$.pipe(
      switchMap(
        _ => of(HealthCheckResult.CreateDefault())
      ),
      merge(this.healthCheckService.requestDataFromMultipleSources(urls))  
    );

    this.subscription = source$.subscribe(newResult => {
      var index = this.lastResults.findIndex(result => result.url === newResult.url);
      if(index >= 0) {
        if(newResult.status !== this.lastResults[index].status) {
          this.lastResults[index] = newResult;
          this.updateChart(newResult);
        }
      } else {
        this.updateChartAll();
      }    
    })
}
  updateChartAll() {
    if(!this.time) {
      this.time = new Date();
    } else {
      this.time.setTime(this.time.getTime() + this.updateInterval);
    }
   
    this.urls.forEach(url => {
      let lastResultIndex = this.lastResults.findIndex(lastResult => lastResult.url === url);
      let value = this.lastResults[lastResultIndex].IsOnline() ? this.SUCCESS_VALUE : this.BROKEN_VALUE;

      this.dataPoints[url].push({
        x: this.time.getTime(),
        y: value
      });

    });
    this.chart.render();
  }

  updateChart(result: HealthCheckResult) {
      this.yValue1 = result.IsOnline() ? this.SUCCESS_VALUE : this.BROKEN_VALUE;
      let currentTime = new Date().getTime();
      if(currentTime < this.time.getTime()) {
        currentTime = this.time.getTime();
      }
      this.dataPoints[result.url].push({
        x: currentTime,
        y: this.yValue1
      });
    
    this.chart.render();
  }
}
