import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'healthCheckEnvPipe'
})
export class HealthCheckEnvPipePipe implements PipeTransform {

  transform(environments: string[], filter: string): string[] {
    if (!environments || !filter) {
      return environments;
    }
    return environments.filter(env => env.indexOf(filter) === -1);

  }

}
