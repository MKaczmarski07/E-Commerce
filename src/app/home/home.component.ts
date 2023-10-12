import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

interface Item {
  gender: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  shoes: Observable<Item[]> | undefined;

  getCollections() {
    const shoesCollection = collection(this.firestore, 'shoes') as any;
    this.shoes = collectionData<Item>(shoesCollection);
  }

  ngOnInit() {
    this.getCollections();
  }
}
