import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Item } from '../shared/item';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  getCollection(collectionName: string) {
    const CollectionRef = collection(this.firestore, collectionName) as any;
    return collectionData<Item>(CollectionRef);
  }
}
