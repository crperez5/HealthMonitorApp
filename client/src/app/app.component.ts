import { Component, OnInit } from '@angular/core';
import { HealthCheckEnvServiceService } from './health-check-env-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any[];
  environments: string[] = [];
  urls: string[] = [];
  selectedEnvironment = 'Localhost';
  
  constructor(
    private environmentService: HealthCheckEnvServiceService) {
    }


  ngOnInit(): void {
    this.environmentService.getJSON().subscribe(data => {
      this.data = data;
      this.environments = Object.keys(data);
      this.selectedEnvironment = this.environments[0];
      this.urls = this.data[this.selectedEnvironment];
  });
  }

  onEnvironmentChange (newEnvironment) {
    this.selectedEnvironment = newEnvironment;
    this.urls = this.data[this.selectedEnvironment];
  }
}
