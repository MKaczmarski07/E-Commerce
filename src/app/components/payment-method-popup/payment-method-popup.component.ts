import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { DialogAnimation, BackgroundAnimation } from '../../shared/animations';
import { PaymentMethodService } from 'src/app/services/payment-method.service';

@Component({
  selector: 'app-payment-method-popup',
  templateUrl: './payment-method-popup.component.html',
  styleUrls: ['./payment-method-popup.component.scss'],
  animations: [DialogAnimation, BackgroundAnimation],
})
export class PaymentMethodPopupComponent {
  @Output() methodChanged = new EventEmitter();

  constructor(public paymentMethodService: PaymentMethodService) {}

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.paymentMethodService.handlePopup();
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
      this.paymentMethodService.handlePopup();
    }
  }
}
