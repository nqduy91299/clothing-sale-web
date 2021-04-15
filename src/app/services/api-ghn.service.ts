import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  resDistrictModel,
  resProvinceModel,
  resWardModel,
} from '../models/ghn.model';

@Injectable({
  providedIn: 'root',
})
export class ApiGhnService {
  url_province =
    'https://online-gateway.ghn.vn/shiip/public-api/master-data/province';
  url_district =
    'https://online-gateway.ghn.vn/shiip/public-api/master-data/district';
  url_ward = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward';
  constructor(private httpClient: HttpClient) {}

  apiProvinceGet(): Observable<resProvinceModel> {
    const options = {
      headers: new HttpHeaders().set('token', environment.ghnToken),
    };

    return this.httpClient.get<resProvinceModel>(this.url_province, options);
  }

  apiDistrictGet(province_id: number): Observable<resDistrictModel> {
    const options = {
      headers: new HttpHeaders().set('token', environment.ghnToken),
      params: new HttpParams().set('province_id', province_id.toString()),
    };

    return this.httpClient.get<resDistrictModel>(this.url_district, options);
  }
  apiWardGet(district_id: number): Observable<resWardModel> {
    const options = {
      headers: new HttpHeaders().set('token', environment.ghnToken),
      params: new HttpParams().set('district_id', district_id.toString()),
    };

    return this.httpClient.get<resWardModel>(this.url_ward, options);
  }
}
