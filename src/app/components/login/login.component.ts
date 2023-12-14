import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService, AuthResponseData } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared/form-validation.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  @Input() isSignInMode = true;
  isAuthPage = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {
    this.checkIfAuthPage();
    this.changeValidator();
  }

  checkIfAuthPage() {
    if (this.router.url === '/auth') {
      this.isAuthPage = true;
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const repeatedPassword = group.get('repeatedPassword')?.value;

    if (password === repeatedPassword) {
      group.get('repeatedPassword')?.setErrors(null);
      return null;
    } else {
      group.get('repeatedPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  changeValidator() {
    if (!this.isSignInMode) {
      this.form.addControl(
        'repeatedPassword',
        new FormControl('', [Validators.required])
      );
      this.form.setValidators(this.passwordMatchValidator as any);
    } else {
      this.form.removeControl('repeatedPassword');
      this.form.setValidators(null);
    }
  }

  onSubmit() {
    this.error = null;
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
        this.error = null;
        this.isLoading = false;
        if (this.isAuthPage) {
          this.router.navigate(['/home']);
        }
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.resetForm();
  }

  resetForm() {
    this.form.reset();
  }

  showPassword(id: string) {
    const password = document.getElementById(id) as HTMLInputElement;
    password.type = password.type === 'password' ? 'text' : 'password';
  }
}
