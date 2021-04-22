import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel, res2pModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiManageOrderService {
  host = environment.host + 'admin/order/';
  token = 'Bearer ' + localStorage.getItem('token');
  constructor(private httpClient: HttpClient) {}

  apiOrdersNeedConfirmGet(): Observable<OrderModel[]> {
    const url = this.host;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    };

    return this.httpClient.get<OrderModel[]>(url, httpOptions);
  }
  apiAllOrdersGet(): Observable<res2pModel<OrderModel[]>> {
    const url = this.host + 'history';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    };

    return this.httpClient.get<res2pModel<OrderModel[]>>(url, httpOptions);
  }

  apiConfirmOrderPost(id): Observable<res2pModel<string>> {
    const url = this.host + 'confirm';
    const body = { orderID: id };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    };
    return this.httpClient.post<res2pModel<string>>(url, body, httpOptions);
  }

  apiCreateTicketPost(id): Observable<res2pModel<string>> {
    const url = this.host + 'ticket';
    const body = { orderID: id };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    };
    return this.httpClient.post<res2pModel<string>>(url, body, httpOptions);
  }

  apiDeleteTicketPost(id): Observable<res2pModel<string>> {
    const url = this.host + 'cancel';
    const body = { orderID: id };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    };
    return this.httpClient.post<res2pModel<string>>(url, body, httpOptions);
  }
}
