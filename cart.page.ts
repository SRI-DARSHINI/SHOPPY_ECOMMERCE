import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { ActivatedRoute } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  imports: [
    IonButton
  ],
})
export class CartPage implements OnInit {
  userId: string;
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {
    // Get the userId from route parameters or another method
    this.userId = 'USER_ID_HERE'; // Replace with actual user ID
  }

  ngOnInit() {
    this.fetchCartItems();
  }

  fetchCartItems() {
    this.cartService.getCartItems(this.userId).subscribe((items) => {
      this.cartItems = items;
    });
  }

  addItemToCart() {
    // Example item - replace with real data from UI
    const itemName = 'Sample Product';
    const itemPrice = 100;
    const itemQuantity = 1;

    this.cartService
      .addItemToCart(this.userId, itemName, itemPrice, itemQuantity)
      .subscribe(() => {
        this.fetchCartItems();
      });
  }

  removeItemFromCart(itemId: string) {
    this.cartService.removeItemFromCart(this.userId, itemId).subscribe(() => {
      this.fetchCartItems();
    });
  }

  clearCart() {
    this.cartService.clearCart(this.userId).subscribe(() => {
      this.cartItems = [];
    });
  }
}
