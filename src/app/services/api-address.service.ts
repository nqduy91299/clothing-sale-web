import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DistrictModel, ProvinceModel, WardModel } from '../models';
import { res3pModel } from '../models/checkout.model';

@Injectable({
  providedIn: 'root',
})
export class ApiAddressService {
  host = environment.host + 'checkout/';

  constructor(private httpClient: HttpClient) {}

  apiProvinceByIdGet(id): Observable<res3pModel<ProvinceModel>> {
    const url = this.host + 'province/' + id;

    return this.httpClient.get<res3pModel<ProvinceModel>>(url);
  }
  apiDistrictByIdGet(id, idProvince): Observable<res3pModel<DistrictModel>> {
    const url = this.host + 'district/' + idProvince + '/' + id;

    return this.httpClient.get<res3pModel<DistrictModel>>(url);
  }
  apiWardByIdGet(code, idDistrict): Observable<res3pModel<WardModel>> {
    const url = this.host + 'ward/' + idDistrict + '/' + code;

    return this.httpClient.get<res3pModel<WardModel>>(url);
  }
}
