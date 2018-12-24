import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthCheckEnvPipePipe } from '../health-check-env-pipe.pipe'
import { HealthCheckEnvDropdownComponent } from './health-check-env-dropdown.component';

describe('HealthCheckEnvDropdownComponent', () => {
  let component: HealthCheckEnvDropdownComponent;
  let fixture: ComponentFixture<HealthCheckEnvDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCheckEnvDropdownComponent, HealthCheckEnvPipePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCheckEnvDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
