import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HealthCheckListComponent } from './health-check-list/health-check-list.component';
import { HealthCheckEnvDropdownComponent } from './health-check-env-dropdown/health-check-env-dropdown.component';
import { HttpClientModule } from '@angular/common/http';
import { HealthCheckEnvPipePipe } from './health-check-env-pipe.pipe';
import { HealthCheckLiveChartComponent } from './health-check-live-chart/health-check-live-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HealthCheckListComponent,
    HealthCheckEnvDropdownComponent,
    HealthCheckEnvPipePipe,
    HealthCheckLiveChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
