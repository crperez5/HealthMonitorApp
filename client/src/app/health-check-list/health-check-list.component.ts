import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { HealthCheckListEndpointServiceService } from '../health-check-list-endpoint-service.service';
import { Observable, of, Subscription } from 'rxjs';
import { HealthCheckResult } from './HealthCheckResult';
@Component({
  selector: 'app-health-check-list',
  templateUrl: './health-check-list.component.html',
  styleUrls: ['./health-check-list.component.css']
})
export class HealthCheckListComponent implements OnChanges {
  data$: Observable<HealthCheckResult> = of(HealthCheckResult.CreateDefault());
  results: HealthCheckResult[] = [];
  healthCheckEndpointService: HealthCheckListEndpointServiceService;
  subscription: Subscription;

  constructor(healthCheckEndpointService: HealthCheckListEndpointServiceService) {
    this.healthCheckEndpointService = healthCheckEndpointService;
  }

  @Input() urls: string[];
  ngOnChanges(changes: SimpleChanges): void {
    const urls: SimpleChange = changes.urls;
    if(this.subscription) {
      this.subscription.unsubscribe();
    }

    if (urls.currentValue.length > 0) {
      this.updateList(urls.currentValue);
      this.results = [];
    }
  }

  updateList(urls) {  
      this.subscription = this.healthCheckEndpointService.requestDataFromMultipleSources(urls).subscribe(data => {
        const index = this.results.findIndex(resultItem => resultItem.url === data.url);
        if (index >= 0) {
          this.results[index] = data;
        } else {
          this.results.push(data);
        }
      });
  }

}
