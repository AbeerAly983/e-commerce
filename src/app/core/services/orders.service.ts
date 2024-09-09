import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  _HttpClient = inject(HttpClient);
  header: any = { token: localStorage.getItem('userToken') };
  constructor() {}
  checkout(id: string, details: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: details,
      },
      {
        headers: this.header,
      }
    );
  }
}
