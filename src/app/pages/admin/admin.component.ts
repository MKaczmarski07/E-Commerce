import { Component } from '@angular/core';
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
  form: FormGroup;
  image: any;
  imageName: string | null = null;
  showError = false;
  forOptions = ['women', 'men', 'kids'];
  categories: string[] = [];
  sizes: string[] = [];

  constructor(
    private databaseService: DatabaseService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      shortDes: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      for: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  changeFor(event: any) {
    const selectedFor = event.target.value.split(' ')[1];
    this.form.get('for')?.setValue(selectedFor);
    this.setCategories(selectedFor);
  }

  changeCategory(event: any) {
    const selectedCategory = event.target.value.split(' ')[1];
    this.form.get('category')?.setValue(selectedCategory);
  }

  setCategories(forValue: string) {
    if (forValue === 'men') {
      this.categories = ['shoes', 'bottoms', 'tops', 'jackets'];
      return;
    } else if (forValue === 'women') {
      this.categories = ['shoes', 'tops', 'leggings', 'jackets'];
      return;
    } else if (forValue === 'kids') {
      this.categories = ['sets', 'shoes', 'bottoms', 'tops', 'jackets'];
      return;
    }
  }

  handleImage(event: any) {
    const file = event.target.files[0];
    this.image = file;
    this.imageName = file.name;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.showError = true;
      return;
    }
    const user = {
      id: '',
      name: this.form.get('name')?.value,
      price: this.form.get('price')?.value,
      for: this.form.get('for')?.value,
      category: this.form.get('category')?.value,
      shortDes: this.form.get('shortDes')?.value,
      sizes: this.addSizes(),
      imageUrl: '',
    };

    this.databaseService.setProductData(user, this.image);
    this.form.reset();
    this.image = null;
    this.showError = false;
    alert('Product added successfully');
  }

  addSizes() {
    let sizes: string[] = [];
    if (this.form.get('category')?.value === 'shoes') {
      if (this.form.get('for')?.value === 'men') {
        sizes = [
          'EU 38.5',
          'EU 39',
          'EU 39.5',
          'EU 40',
          'EU 40.5',
          'EU 41',
          'EU 41.5',
          'EU 42',
          'EU 42.5',
          'EU 43',
          'EU 43.5',
          'EU 44',
          'EU 44.5',
          'EU 45',
          'EU 45.5',
          'EU 46',
          'EU 46.5',
          'EU 47',
          'EU 47.5',
          'EU 48',
          'EU 48.5',
          'EU 49',
        ];
      }
      if (this.form.get('for')?.value === 'women') {
        sizes = [
          'EU 35.5',
          'EU 36',
          'EU 36.5',
          'EU 37',
          'EU 37.5',
          'EU 38',
          'EU 38.5',
          'EU 39',
          'EU 39.5',
          'EU 40',
          'EU 40.5',
          'EU 41',
          'EU 41.5',
          'EU 42',
          'EU 42.5',
          'EU 43',
          'EU 43.5',
          'EU 44',
        ];
      }
      if (this.form.get('for')?.value === 'kids') {
        sizes = [
          'EU 35.5',
          'EU 36',
          'EU 36.5',
          'EU 37',
          'EU 37.5',
          'EU 38',
          'EU 38.5',
          'EU 39',
          'EU 39.5',
          'EU 40',
        ];
      }
    } else {
      sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    }
    return sizes;
  }
}
