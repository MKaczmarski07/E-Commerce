import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InitialPopupService {
  savedPopupState = true;

  initValue() {
    const state = this.getState();
    if (state === null) {
      this.saveState(true);
    }
  }

  saveState(state: boolean) {
    localStorage.setItem('popupState', JSON.stringify(state));
  }

  getState() {
    const state = localStorage.getItem('popupState');
    if (state) {
      return JSON.parse(state);
    } else {
      return null;
    }
  }
}
