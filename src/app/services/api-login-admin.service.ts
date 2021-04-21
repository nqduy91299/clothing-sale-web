import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class ApiLoginAdminService {
  host = environment.host;
  constructor(private httpClient: HttpClient) {}

  apiLoginPost(username, password): Observable<LoginModel> {
    const url = this.host + 'login';
    const body = { username: username, password: password };

    return this.httpClient.post<LoginModel>(url, body);
  }
}
