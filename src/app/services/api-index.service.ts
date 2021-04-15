import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/index.model';

@Injectable({
  providedIn: 'root',
})
export class ApiIndexService {
  constructor(private httpClient: HttpClient) {}
  
  apiProductsGet(): Observable<HttpResponse<ProductModel[]>> {
    const url = environment.host;
    return this.httpClient.get<ProductModel[]>(url, { observe: 'response' });
  }

  apiProductDetailGet(id: string) {
    const url = environment.host + 'product/' + id;
    return this.httpClient.get<ProductModel>(url);
  }
}
