import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-method-button',
  templateUrl: './payment-method-button.component.html',
  styleUrls: ['./payment-method-button.component.scss'],
})
export class PaymentMethodButtonComponent implements OnInit {
  paymentMethod: string = 'paypal';
  showPopup = false;

  brands = [
    { name: 'visa', src: '../../../assets/images/brands/Visa_Inc._logo.svg' },
    {
      name: 'mastercard',
      src: '../../../assets/images/brands/Mastercard-logo.svg',
    },
    { name: 'paypal', src: '../../../assets/images/brands/paypal-ar21.svg' },
    {
      name: 'applepay',
      src: '../../../assets/images/brands/Apple_Pay_logo.svg',
    },
    {
      name: 'googlepay',
      src: '../../../assets/images/brands/Google_Pay_Logo.svg',
    },
  ];
  logoSrc = '../../../assets/images/brands/paypal-ar21.svg';
  constructor() {}

  ngOnInit() {
    this.getPaymentMethod();
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  getPaymentMethod() {
    if (localStorage.getItem('paymentMethod') === null) {
      localStorage.setItem('paymentMethod', this.paymentMethod);
    } else {
      this.paymentMethod = localStorage.getItem('paymentMethod')!;
      this.changeLogoSrc();
    }
  }

  changeLogoSrc() {
    this.logoSrc = this.brands.find(
      (brand) => brand.name === this.paymentMethod
    )!.src;
  }
}
