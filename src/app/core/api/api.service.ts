import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  prefix = 'graphql';
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer '+localStorage.getItem('accessToken'),
      'Content-Type': 'application/json'
    })
  };

  constructor(private readonly _httpClient:HttpClient) {
  }

  public getData(queryProps,queryParams,nombreQuery): Observable<any>{
    return this._httpClient.get(`${environment.serverUrl}/${this.prefix}/secret?query=query{${nombreQuery}(${queryParams}){${queryProps}}}`, this.httpOptions);
  }
  public getUserData( queryParams, nombreQuery): Observable<any> {
    return this._httpClient.get(`${environment.serverUrl}/${this.prefix}/secret?query=query{${nombreQuery}(${queryParams})}`, this.httpOptions);
  }

  public setData(queryProps,queryParams,nombreQuery): Observable<any>{
    return this._httpClient.get(`${environment.serverUrl}/${this.prefix}/secret?query=mutation{${nombreQuery}(${queryParams}){${queryProps}}}`, this.httpOptions);
  }

}
