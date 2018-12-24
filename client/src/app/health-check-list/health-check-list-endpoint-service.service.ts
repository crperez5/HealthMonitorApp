import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, of, timer  } from 'rxjs';
import { mergeMap, switchMap, map, catchError } from 'rxjs/operators';

import { HealthCheckResult } from './HealthCheckResult';
@Injectable({
  providedIn: 'root'
})
export class HealthCheckListEndpointServiceService {

  constructor(private http: HttpClient) { }

  public requestDataFromMultipleSources(urls): Observable<HealthCheckResult> {
    return timer(0, 30000)
      .pipe(
        switchMap(_ => {
          return from(urls).pipe(
            mergeMap(url => {
              return this.http.get(`${url}`, { observe: 'response' })
              .pipe(
                map((response) => new HealthCheckResult(response.url, response.headers.get('component'), response.headers.get('version'), 'ONLINE', [])),
                catchError((response: HttpErrorResponse) => {
                  return of(new HealthCheckResult(response.url, response.headers.get('component'), response.headers.get('version'), 'BROKEN', response.error.error));
                })
              )
            })
          )
        })
      )
     
  }
}
