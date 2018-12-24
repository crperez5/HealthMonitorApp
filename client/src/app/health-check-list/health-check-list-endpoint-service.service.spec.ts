import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { HealthCheckListEndpointServiceService } from './health-check-list-endpoint-service.service';

describe('HealthCheckListEndpointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: HealthCheckListEndpointServiceService = TestBed.get(HealthCheckListEndpointServiceService);
    expect(service).toBeTruthy();
  });
});
