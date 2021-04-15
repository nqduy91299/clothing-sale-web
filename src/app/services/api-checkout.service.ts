import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiCheckoutService {
  constructor(private httpClient: HttpClient) {}

  apiCheckoutOrderPost(form, items) {
    console.log(form, items);
  }
}
