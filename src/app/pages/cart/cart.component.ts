import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  subTotal: number = 0;
  shipping: number = 0;
  total: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.subTotal = 1.23;
    this.shipping = 3.5;
    this.total = this.subTotal + this.shipping;
  }
}
