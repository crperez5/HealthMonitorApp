import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { HealthCheckEnvServiceService } from './health-check-env-service.service';

describe('HealthCheckEnvServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientModule]}));

  it('should be created', () => {
    const service: HealthCheckEnvServiceService = TestBed.get(HealthCheckEnvServiceService);
    expect(service).toBeTruthy();
  });
});
