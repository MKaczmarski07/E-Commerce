import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, doc, getDoc } from 'firebase/firestore';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public firestore: Firestore = inject(Firestore);

  constructor() {}

  getCollection() {
    const CollectionRef = collection(this.firestore, 'products') as any;
    return collectionData<Item>(CollectionRef);
  }

  async getItem(id: string): Promise<Item> {
    const docRef = doc(this.firestore, 'products', id) as any;
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Item;
  }

  async getItemsbyIDs(ids: string[]): Promise<Item[]> {
    const items: Item[] = [];
    for (const id of ids) {
      const docRef = doc(this.firestore, 'products', id) as any;
      const docSnap = await getDoc(docRef);
      items.push(docSnap.data() as Item);
    }
    return items;
  }
}
