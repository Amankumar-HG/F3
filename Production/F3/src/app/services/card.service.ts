import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart-items';

@Injectable({
  providedIn: 'root',
})
export class CardService {

  constructor(private afs: AngularFirestore) {}

  public getCartItems(){
    return this.afs.collection("cartitems").snapshotChanges();
    
  }

  public addCartItem(item: CartItem) {

    // To generate a new unique ID for the cart item
    item.id = parseInt(this.afs.createId());
    return this.afs.collection("cartitems").add(item);
  }
  

  public updateCartItem(item: CartItem) {
    return this.afs.doc("cartitems/"+item.id).update(item);
  }

  public removeCartItem(id: number) {
    return this.afs.doc("cartitems/"+id).delete();
  }
 
}
