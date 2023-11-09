import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, doc, getDoc } from 'firebase/firestore';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public firestore: Firestore = inject(Firestore);

  constructor() {}

  getCollection(collectionName: string) {
    const CollectionRef = collection(this.firestore, collectionName) as any;
    return collectionData<Item>(CollectionRef);
  }

  async getItem(collectionName: string, id: string) {
    const docRef = doc(this.firestore, collectionName, id) as any;
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Item;
  }
}
