import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { LoadProductService } from 'src/app/services/load-product.service';
import { Observable } from 'rxjs';
import { Item } from '../../models/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shoes: Observable<Item[]> | undefined;

  constructor(
    private databaseService: DatabaseService,
    private loadProductService: LoadProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.shoes = this.databaseService.getCollection();
  }

  onProductClick(item: Item) {
    this.loadProductService.loadProduct(item);
  }
}
