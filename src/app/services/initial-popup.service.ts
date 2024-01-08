import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InitialPopupService {
  savedPopupState = true;

  // if its the first time the user visits the site, show the popup
  // if the user has already visited the site, don't show the popup

  initValue() {
    const state = this.getState();
    if (state === null) {
      this.saveState(false);
      return true;
    } else {
      return this.getState();
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
