import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService {
  isPopupVisible: boolean = false;
  paymentMethod = 'visa';
  paymentMethodSubject = new Subject<string>();
  paymentMethod$ = this.paymentMethodSubject.asObservable();

  constructor() {}

  changePaymentMethod(method: string) {
    this.paymentMethod = method;
    localStorage.setItem('paymentMethod', this.paymentMethod);

    // value changed, notify subscribers
    this.paymentMethodSubject.next(this.paymentMethod);

    this.handlePopup();
  }

  handlePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  getPaymentMethod() {
    if (localStorage.getItem('paymentMethod') === null) {
      localStorage.setItem('paymentMethod', this.paymentMethod);
    } else {
      this.paymentMethod = localStorage.getItem('paymentMethod')!;
      // value changed, notify subscribers
      this.paymentMethodSubject.next(this.paymentMethod);
    }
  }
}
