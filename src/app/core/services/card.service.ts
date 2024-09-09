import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly _HttpClient = inject(HttpClient);
  headers: any = {
    token: localStorage.getItem('userToken'),
  };
  constructor() {}
  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: this.headers,
      }
    );
  }
  getProductCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.headers,
    });
  }

  removeItemFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/cart/${id}`,

      {
        headers: this.headers,
      }
    );
  }
  updateQuantity(id: string, newcount: number): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/api/v1/cart/${id}`,
      {
        count: newcount,
      },
      {
        headers: this.headers,
      }
    );
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.headers,
    });
  }
}
