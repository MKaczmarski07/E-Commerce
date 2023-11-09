import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Item } from '../../models/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  item: Item | undefined;
  collection = '';
  id = '';

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.collection = this.route.snapshot.params['subCategory'];
    this.id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    this.databaseService.getItem(this.collection, this.id).then((item) => {
      this.item = item;
      console.log(this.item);
    });
  }
}
