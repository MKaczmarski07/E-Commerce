import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  secondStepPassed = false;
  thirdStepPassed = false;

  deliveryForm: FormGroup;
  errors: string[] = [];

  constructor(private fb: FormBuilder) {
    this.deliveryForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
    });
  }

  onSubmit() {
    if (this.deliveryForm.valid) {
      this.secondStepPassed = true;
      localStorage.setItem(
        'deliveryData',
        JSON.stringify(this.deliveryForm.value)
      );
    }
  }
}
