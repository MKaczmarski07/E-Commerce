import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout-auth',
  templateUrl: './checkout-auth.component.html',
  styleUrls: ['./checkout-auth.component.scss'],
})
export class CheckoutAuthComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      (user) => ((this.isAuthenticated = !!user), this.onLogin())
    );
  }

  onLogin() {
    if (this.isAuthenticated) {
      this.router.navigate(['/checkout']);
    }
  }

  onRegister() {
    this.router.navigate(['/auth']);
    this.authService.isSignInMode = false;
  }

  onGuest() {
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
