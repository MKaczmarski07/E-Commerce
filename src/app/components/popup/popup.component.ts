import { Component, HostListener, Input } from '@angular/core';
import { DialogAnimation, BackgroundAnimation } from '../../shared/animations';
import { InitialPopupService } from '../../services/initial-popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [DialogAnimation, BackgroundAnimation],
})
export class PopupComponent {
  @Input() isPopupVisible = false;

  constructor(private initialPopupService: InitialPopupService) {}

  closePopup() {
    this.isPopupVisible = false;
    this.initialPopupService.saveState(false);
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
}
