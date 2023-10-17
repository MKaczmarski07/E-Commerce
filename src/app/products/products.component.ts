import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable, map } from 'rxjs';
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
  imageSource = '';

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
    this.items = this.firebaseService
      .getCollection(this.subCategory)
      .pipe(
        // filter out items that are not for the current category
        map((items) => items.filter((item) => item.for === this.category))
      )
      .pipe(
        // add path property to each item for image source
        map((items) =>
          items.map((item) => {
            return {
              ...item,
              path: `${this.subCategory}/${item.id}.png`,
            };
          })
        )
      );
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
