import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { Item } from '../models/item';
import { set, update } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public firestore: Firestore = inject(Firestore);
  public storage: Storage = inject(Storage);

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

  async addProduct(item: Item): Promise<string> {
    const CollectionRef = collection(this.firestore, 'products') as any;
    let ID = '';
    await addDoc(CollectionRef, item).then((docRef) => {
      ID = docRef.id;
    });
    return ID;
  }

  async setProductData(item: Item) {
    this.addProduct(item).then((ID) => {
      this.getItem(ID).then((item) => {
        item.id = ID;
        const docRef = doc(this.firestore, 'products', ID) as any;
        setDoc(docRef, item);
      });
    });
  }

  uploadFile(input: HTMLInputElement) {
    if (!input.files) return;

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, file.name);
        uploadBytesResumable(storageRef, file);
        // get download url
        const url = getDownloadURL(storageRef);
      }
    }
  }
}
