import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsCount = new Subject<number>();
  cartItemsCount$ = this.cartItemsCount.asObservable();
  public isCartEmpty = true;
  private lastAddedItem = new Subject<CartItem>();
  lastAddedItem$ = this.lastAddedItem.asObservable();
  private timer: any;
  private isAddInfoVisible = new Subject<boolean>();
  isAddInfoVisible$ = this.isAddInfoVisible.asObservable();

  constructor() {}

  private toggleAddInfo() {
    this.isAddInfoVisible.next(true);
    this.timer = setTimeout(() => {
      this.isAddInfoVisible.next(false);
    }, 3000);
  }

  closeAddInfo() {
    this.isAddInfoVisible.next(false);
    clearTimeout(this.timer);
  }

  private updateCartItemsCount() {
    const cartItems = this.getCartItems();
    const cartItemsCount = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const sum = cartItemsCount === 1 ? cartItems.length : cartItemsCount;
    this.cartItemsCount.next(sum);
    this.isCartEmpty = cartItems.length === 0;
  }

  initCartItemsCount() {
    // set initial cart items count on page load
    const cartItems = this.getCartItems();
    const cartItemsCount = cartItems.reduce(
      (acc, item) => (item.quantity = acc + item.quantity),
      0
    );
    this.isCartEmpty = cartItems.length === 0;
    return cartItemsCount;
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
    this.lastAddedItem.next(cartItem);
    this.toggleAddInfo();
    if (
      cartItems.find(
        (item) => item.id === cartItem.id && item.size === cartItem.size
      )
    ) {
      cartItems = cartItems.map((item) =>
        item.id === cartItem.id && item.size === cartItem.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.updateCartItemsCount();
      return;
    }
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.updateCartItemsCount();
    this.calculateTotalPrice();
  }

  removeFromCart(id: string, size: string) {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter(
      (item) => !(item.id === id && (size ? item.size === size : true))
    );
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.updateCartItemsCount();
    this.calculateTotalPrice();
  }

  clearCart() {
    localStorage.removeItem('cartItems');
    this.updateCartItemsCount();
  }

  calculateTotalPrice() {
    const cartItems = this.getCartItems();
    const totalPrice = cartItems.reduce(
      (acc, item) =>
        item.discountPrice
          ? acc + item.discountPrice * item.quantity
          : acc + item.price * item.quantity,
      0
    );
    this.saveTotalPrice(totalPrice);
  }

  saveTotalPrice(totalPrice: number) {
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  }

  getTotalPrice() {
    return JSON.parse(localStorage.getItem('totalPrice') || '{}');
  }
}
