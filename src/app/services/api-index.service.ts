import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/index.model';

@Injectable({
  providedIn: 'root',
})
export class ApiIndexService {
  constructor(private httpClient: HttpClient) {}

  apiProductsGet(): Observable<ProductModel[]> {
    const url = environment.host;
    return this.httpClient.get<ProductModel[]>(url);
  }

  apiProductDetailGet(id: string): Observable<ProductModel> {
    const url = environment.host + 'product/' + id;
    return this.httpClient.get<ProductModel>(url);
  }
}
