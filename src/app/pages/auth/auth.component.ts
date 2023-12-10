import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isSignInMode = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isSignInMode = this.authService.isSignInMode;
  }

  ngOnDestroy() {
    this.authService.isSignInMode = true;
  }
}
