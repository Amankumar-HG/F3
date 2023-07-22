import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CartItem } from '../data/cart-item';
import { Product } from '../data/product';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private itemCartCollectionName: string;
  public cartItems: CartItem[];

  constructor(private afs: AngularFirestore) {
    this.itemCartCollectionName = 'cart_items';
    this.cartItems = [];
  }

  public getCartItems() {
    return this.afs.collection(this.itemCartCollectionName).snapshotChanges();
  }

  public updateCartItem(item: CartItem) {
    return this.afs
      .doc(this.itemCartCollectionName + '/' + item.id)
      .update(item);
  }

  public removeCartItem(id: string) {
    return this.afs.doc(this.itemCartCollectionName + '/' + id).delete();
  }
}
