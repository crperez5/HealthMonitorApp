import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, of, timer  } from 'rxjs';
import { mergeMap, switchMap, map, catchError, share } from 'rxjs/operators';

import { HealthCheckResult } from './health-check-list/HealthCheckResult';
@Injectable({
  providedIn: 'root'
})
export class HealthCheckListEndpointServiceService {

  sharedObservables = {};

  constructor(private http: HttpClient) { }

  public requestDataFromMultipleSources(urls: string[]): Observable<HealthCheckResult> {
    const key = urls.join();
    if (this.sharedObservables[key]) {
      return this.sharedObservables[key];
    }    

    const localObservable = timer(0, 30000)
      .pipe(
        switchMap(_ => {
          return from(urls).pipe(
            mergeMap(url => {
              return this.http.get(`${url}`, { observe: 'response' })
              .pipe(
                map((response) => new HealthCheckResult(response.url, response.headers.get('component'), response.headers.get('version'), HealthCheckResult.ONLINE, [])),
                catchError((response: HttpErrorResponse) => {
                  return of(new HealthCheckResult(response.url, response.headers.get('component'), response.headers.get('version'), HealthCheckResult.BROKEN, response.error.error));
                })
              )
            })
          )
        }),
        share()
      )

    this.sharedObservables[key] = localObservable;
    return this.sharedObservables[key];
  }
}
