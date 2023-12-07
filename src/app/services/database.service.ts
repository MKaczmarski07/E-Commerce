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
    // add product to collection and return the ID of the added document
    const CollectionRef = collection(this.firestore, 'products') as any;
    let ID = '';
    await addDoc(CollectionRef, item).then((docRef) => {
      ID = docRef.id;
    });
    return ID;
  }

  async setProductData(item: Item, file: any) {
    try {
      // Add product and get the ID
      const ID = await this.addProduct(item);

      // Upload image to storage and get the URL
      const url = await this.uploadFile(file, ID);

      if (!url) {
        console.error('Image upload failed');
        return;
      }

      console.log('Image URL:', url);

      // Set product data
      const itemData = await this.getItem(ID);

      if (itemData) {
        itemData.id = ID;
        itemData.imageUrl = url;
        const docRef = doc(this.firestore, 'products', ID);
        await setDoc(docRef, itemData);
      }
    } catch (error) {
      console.error('Error setting product data:', error);
      throw error;
    }
  }

  async uploadFile(file: any, ID: string) {
    if (!file) return;

    const newName = this.chnageFileName(file.name, ID);
    const storageRef = ref(this.storage, newName);

    try {
      await uploadBytesResumable(storageRef, file);

      const downloadUrl = await getDownloadURL(storageRef);

      return downloadUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  chnageFileName(fileName: string, ID: string) {
    const format = fileName.split('.').pop();
    const newFileName = ID + '.' + format;
    return newFileName;
  }
}
