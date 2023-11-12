import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Item } from '../../models/item';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CartService, CartItem } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  item: Item | undefined;
  collection = '';
  id = '';
  selectedSize = '';

  constructor(
    private databaseService: DatabaseService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.collection = this.route.snapshot.params['subCategory'];
    this.id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    this.databaseService.getItem(this.collection, this.id).then((item) => {
      if (item) {
        this.item = item;
      } else {
        // prevent access to non-existing item page
        this.router.navigate(['/']);
      }
    });
  }

  onSelectSize(size: string) {
    this.selectedSize = size;
  }

  onAddToCart() {
    if (this.item) {
      const cartItem: CartItem = { ...this.item, size: this.selectedSize };
      this.cartService.addToCart(cartItem);
    }
  }

  onAddToFavorites() {
    if (this.item) {
      console.log(this.item);
    }
  }
}
