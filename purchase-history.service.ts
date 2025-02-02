import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseHistoryService {
  private API_URL = 'http://localhost:3000/api/purchase-history';

  constructor(private http: HttpClient) {}

  getPurchaseHistory(userId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${userId}`);
  }
}
