import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { Item } from '../shared/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  items: Observable<Item[]> | undefined;
  category = '';
  subCategory = '';
  productType = '';

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.loadData();
      this.formatProductType();
    });
  }

  loadData() {
    this.category = this.route.snapshot.params['category'];
    this.subCategory = this.route.snapshot.params['subCategory'];
    this.items = this.firebaseService.getCollection(this.subCategory);
  }

  formatProductType() {
    this.productType =
      this.category === 'women' || this.category === 'men'
        ? this.capitalizeFirstLetter(this.category) +
          `'s` +
          ' ' +
          this.capitalizeFirstLetter(this.subCategory)
        : this.capitalizeFirstLetter(this.category) +
          ' ' +
          this.capitalizeFirstLetter(this.subCategory);
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
