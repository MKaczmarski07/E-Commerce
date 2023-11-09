import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  form: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  isLoading = false;
  isSignInMode = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.invalid) return;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.isSignInMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.form.reset();
  }

  showPassword() {
    const password = document.getElementById('password') as HTMLInputElement;
    password.type = password.type === 'password' ? 'text' : 'password';
  }
}
