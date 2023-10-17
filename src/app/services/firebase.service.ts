import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Storage, getDownloadURL } from '@angular/fire/storage';
import { Item } from '../shared/item';
import { ref } from 'firebase/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);

  constructor() {}

  getCollection(collectionName: string) {
    const CollectionRef = collection(this.firestore, collectionName) as any;
    return collectionData<Item>(CollectionRef);
  }

  getImageUrl(path: string) {
    const storageRef = ref(this.storage, path);
    return getDownloadURL(storageRef);
  }
}
