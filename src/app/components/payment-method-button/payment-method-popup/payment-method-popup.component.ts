import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {
  DialogAnimation,
  BackgroundAnimation,
} from '../../../shared/animations';

@Component({
  selector: 'app-payment-method-popup',
  templateUrl: './payment-method-popup.component.html',
  styleUrls: ['./payment-method-popup.component.scss'],
  animations: [DialogAnimation, BackgroundAnimation],
})
export class PaymentMethodPopupComponent {
  constructor() {}
  @Input() isPopupVisible = false;
  @Input() paymentMethod: string = 'paypal';
  @Output() closePopup = new EventEmitter<boolean>();
  @Output() methodChanged = new EventEmitter();

  changePaymentMethod(method: string) {
    this.paymentMethod = method;
    localStorage.setItem('paymentMethod', this.paymentMethod);
    this.methodChanged.emit(true);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.closePopup.emit(true);
  }

  // Prevent scrolling when the dialog is open
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
  }
  // Prevent scrolling on mobile devices when the dialog is open
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.preventDefault();
  }

  //Close the dialog when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dialog') && target.closest('.overlay')) {
      this.closePopup.emit(true);
    }
  }
}
