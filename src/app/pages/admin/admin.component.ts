import { Component } from '@angular/core';
import { Item } from 'src/app/models/item';
import { DatabaseService } from 'src/app/services/database.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  selectedFor = 'women';
  form: FormGroup;

  constructor(
    private databaseService: DatabaseService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      shortDes: new FormControl('', [Validators.required]),
      longDes: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      for: new FormControl('', [Validators.required]),
      // sizes: new FormControl('', [Validators.required]),
      // imageUrl: new FormControl('', [Validators.required]),
    });
  }

  addtestItem() {
    const item: Item = {
      id: 'test',
      name: 'test',
      price: 0,
      shortDes: 'test',
      longDes: 'test',
      category: 'test',
      for: 'test',
      sizes: ['test', 'test'],
      imageUrl: 'test',
    };
    this.databaseService.setProductData(item);
  }

  onSubmit() {
    // if (this.form.invalid) return;
    console.log(this.form.value);
  }
}
