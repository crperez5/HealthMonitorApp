import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HealthCheckEnvDropdownComponent } from './health-check-env-dropdown/health-check-env-dropdown.component'
import { HealthCheckListComponent } from './health-check-list/health-check-list.component'
import { HealthCheckEnvPipePipe } from './health-check-env-pipe.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HealthCheckEnvDropdownComponent,
        HealthCheckListComponent,
        HealthCheckEnvPipePipe
      ],
      imports: [BrowserModule, HttpClientModule],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ILO Status in Localhost');
  });
});
