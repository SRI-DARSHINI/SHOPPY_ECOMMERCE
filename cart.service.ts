import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  // Fetch user's cart items
  getCartItems(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Add item to cart
  addItemToCart(userId: string, name: string, price: number, quantity: number): Observable<any> {
    const cartItem = { userId, name, price, quantity };
    return this.http.post(`${this.apiUrl}/add`, cartItem);
  }

  // Remove item from cart
  removeItemFromCart(userId: string, itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${userId}/${itemId}`);
  }

  // Clear the cart
  clearCart(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear/${userId}`);
  }
}
