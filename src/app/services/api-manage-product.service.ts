import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { res2pModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiManageProductService {
  host = environment.host + 'admin/';
  token = 'Bearer ' + localStorage.getItem('token');

  constructor(private httpClient: HttpClient) {}

  apiCreateProductPost(body): Observable<res2pModel<string>> {
    const url = this.host + 'create';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
        // 'Content-Type': 'multipart/form-data; boundary=something',
      }),
    };
    return this.httpClient.post<res2pModel<string>>(url, body, httpOptions);
  }
  apiUpdateProductPost(body): Observable<res2pModel<string>> {
    const url = this.host + 'update';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
        // 'Content-Type': 'multipart/form-data; boundary=something',
      }),
    };
    return this.httpClient.post<res2pModel<string>>(url, body, httpOptions);
  }

  apiDeleteProductPost(id): Observable<res2pModel<string>> {
    const url = this.host + 'delete';
    const body = { id: id };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token,
      }),
    };
    return this.httpClient.post<res2pModel<string>>(url, body, httpOptions);
  }
}
