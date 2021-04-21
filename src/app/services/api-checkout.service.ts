import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel, res3pModel, res2pModel, FeeModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiCheckoutService {
  pathCheckout: string = 'checkout/';
  constructor(private httpClient: HttpClient) {}

  apiCheckoutOrderPost(form, items): Observable<res3pModel<OrderModel>> {
    const dataSize = { data: items };
    const body = { ...form, ...dataSize };
    const url = environment.host + this.pathCheckout + 'order';

    return this.httpClient.post<res3pModel<OrderModel>>(url, body);
  }

  apiCalculateFeeDeliveryPost(districtId): Observable<res3pModel<FeeModel>> {
    const url = environment.host + this.pathCheckout + 'fee';
    const body = { districtID: districtId };

    return this.httpClient.post<res3pModel<FeeModel>>(url, body);
  }

  apiTrackingOrderGet(id): Observable<res2pModel<OrderModel>> {
    const url = environment.host + this.pathCheckout + 'check/' + id;

    return this.httpClient.get<res2pModel<OrderModel>>(url);
  }

  apiOrderByPhoneGet(phone): Observable<res2pModel<OrderModel[]>> {
    const url = environment.host + this.pathCheckout + 'history/' + phone;

    return this.httpClient.get<res2pModel<OrderModel[]>>(url);
  }

  apiCancelOrderPost(id): Observable<res2pModel<string>> {
    const url = environment.host + this.pathCheckout + 'cancel';
    const body = { id: id };

    return this.httpClient.post<res2pModel<string>>(url, body);
  }
}
