import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Observable } from 'rxjs';
import { Item } from '../../models/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shoes: Observable<Item[]> | undefined;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.shoes = this.databaseService.getCollection('shoes');
  }

  // duplikacja kodu
  // loadProduct(item: Item) {
  //   const path =
  //     'products/' + this.category + '/' + this.subCategory + '/' + item.id;
  //   this.router.navigate([path]);
  // }
}
