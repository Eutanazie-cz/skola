import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataRequest} from '../../shared/models/data-request';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(protected http: HttpClient) { }

  getJoke(): Observable<DataRequest> {
    // @ts-ignore
    return this.http.get('https://official-joke-api.appspot.com/random_joke');
  }
}
