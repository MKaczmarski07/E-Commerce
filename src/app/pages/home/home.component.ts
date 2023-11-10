import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
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
    private router: Router
  ) {}

  ngOnInit() {
    this.shoes = this.databaseService.getCollection('shoes');
  }

  loadProduct(item: Item) {
    const path = 'products/' + item.for + '/' + item.category + '/' + item.id;
    this.router.navigate([path]);
    window.scrollTo(0, 0);
  }
}
