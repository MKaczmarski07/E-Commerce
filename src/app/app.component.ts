import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { InitialPopupService } from './services/initial-popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isPopupVisible = false;

  constructor(
    private authService: AuthService,
    private initialPopupService: InitialPopupService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.initialPopupService.initValue();
    this.isPopupVisible = this.initialPopupService.getState();
  }
}
