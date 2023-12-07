import { Component, OnInit } from '@angular/core';
import { PaymentMethodService } from 'src/app/services/payment-method.service';

@Component({
  selector: 'app-payment-method-button',
  templateUrl: './payment-method-button.component.html',
  styleUrls: ['./payment-method-button.component.scss'],
})
export class PaymentMethodButtonComponent implements OnInit {
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

  constructor(public paymentMethodService: PaymentMethodService) {}

  ngOnInit() {
    this.changeLogoSrc();
    this.paymentMethodService.paymentMethod$.subscribe(() => {
      this.changeLogoSrc();
    });
  }

  changeLogoSrc() {
    this.paymentMethodService.getPaymentMethod();
    this.logoSrc = this.brands.find(
      (brand) => brand.name === this.paymentMethodService.paymentMethod
    )!.src;
  }
}
