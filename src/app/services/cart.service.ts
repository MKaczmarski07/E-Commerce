import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Subject } from 'rxjs';

export interface CartItem extends Item {
  size: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsCount = new Subject<number>();
  cartItemsCount$ = this.cartItemsCount.asObservable();

  constructor() {}

  private updateCartItemsCount() {
    const cartItems = this.getCartItems();
    this.cartItemsCount.next(cartItems.length);
  }

  getCartItems(): CartItem[] {
    let cartItems = [];
    const cartItemsString = localStorage.getItem('cartItems');
    if (cartItemsString) {
      cartItems = JSON.parse(cartItemsString);
    }
    return cartItems;
  }

  addToCart(cartItem: CartItem) {
    let cartItems = this.getCartItems();
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.updateCartItemsCount();
  }

  removeFromCart(id: string) {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter((cartItem) => cartItem.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.updateCartItemsCount();
  }

  checkout() {
    // simulate checkout process
    localStorage.removeItem('cartItems');
    this.updateCartItemsCount();
    alert('Thank you for your purchase!');
  }
}
