import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { HealthCheckLiveChartComponent } from './health-check-live-chart.component';

describe('HealthCheckLiveChartComponent', () => {
  let component: HealthCheckLiveChartComponent;
  let fixture: ComponentFixture<HealthCheckLiveChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCheckLiveChartComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCheckLiveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
