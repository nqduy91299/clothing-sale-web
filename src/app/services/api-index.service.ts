import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel, res2pModel, responsePaginatorModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiIndexService {
  constructor(private httpClient: HttpClient) {}

  apiProductsGet(
    page: number = 1,
    limit: number = 10
  ): Observable<responsePaginatorModel<ProductModel[]>> {
    const url = environment.host;
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    const optionsHttp = { params: params };

    return this.httpClient.get<responsePaginatorModel<ProductModel[]>>(
      url,
      optionsHttp
    );
  }

  apiProductDetailGet(id: string): Observable<res2pModel<ProductModel>> {
    const url = environment.host + 'product/' + id;
    return this.httpClient.get<res2pModel<ProductModel>>(url);
  }
}
