import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable, map } from 'rxjs';
import { Item } from '../../models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadProductService } from '../../services/load-product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  items: Observable<Item[]> | undefined;
  category = '';
  for = '';
  productType = '';
  itemsID = '';

  constructor(
    private databaseService: DatabaseService,
    private loadProductService: LoadProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.loadData();
      this.formatProductType();
    });
  }

  loadData() {
    this.for = this.route.snapshot.params['for'];
    this.category = this.route.snapshot.params['category'];
    this.items = this.databaseService.getCollection().pipe(
      // filter out items that are not for the current category
      map((items) =>
        items.filter(
          (item) => item.for === this.for && item.category === this.category
        )
      )
    );
  }

  formatProductType() {
    this.productType =
      this.for === 'women' || this.for === 'men'
        ? this.capitalizeFirstLetter(this.for) +
          `'s` +
          ' ' +
          this.capitalizeFirstLetter(this.category)
        : this.capitalizeFirstLetter(this.for) +
          ' ' +
          this.capitalizeFirstLetter(this.category);
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  onProductClick(item: Item) {
    this.loadProductService.loadProduct(item);
  }
}
