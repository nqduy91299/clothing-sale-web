import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiIndexService {
  constructor(private httpClient: HttpClient) {}

  apiProductsGet() {
    return this.httpClient.get(environment.host);
  }
}
