import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { Item } from '../shared/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shoes: Observable<Item[]> | undefined;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.shoes = this.firebaseService.getCollection('shoes');
  }
}
