import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable, map } from 'rxjs';
import { Item } from '../../models/item';
import { ActivatedRoute, Router } from '@angular/router';

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
  itemsID = '';

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
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
    this.items = this.databaseService.getCollection(this.subCategory).pipe(
      // filter out items that are not for the current category
      map((items) => items.filter((item) => item.for === this.category))
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

  loadProduct(item: Item) {
    const path =
      'products/' + this.category + '/' + this.subCategory + '/' + item.id;
    this.router.navigate([path]);
    window.scrollTo(0, 0);
  }
}
