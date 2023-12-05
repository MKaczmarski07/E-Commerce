import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkout-progress-bar',
  templateUrl: './checkout-progress-bar.component.html',
  styleUrls: ['./checkout-progress-bar.component.scss'],
})
export class CheckoutProgressBarComponent {
  @Input() secondStepPassed = false;
  @Input() thirdStepPassed = false;
}
