import { HealthCheckEnvPipePipe } from './health-check-env-pipe.pipe';

describe('HealthCheckEnvPipePipe', () => {
  it('create an instance', () => {
    const pipe = new HealthCheckEnvPipePipe();
    expect(pipe).toBeTruthy();
  });
});
