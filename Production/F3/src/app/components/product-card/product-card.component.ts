import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/data/cart-item';
import { Product } from 'src/app/data/product';
import { CardService } from 'src/app/services/card.service';
import {
  AngularFirestore,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() public product!: Product;
  private itemCartCollectionName: string;
  private itemCartCollectionFieldId: string;

  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
    private cardService: CardService
  ) {
    this.itemCartCollectionName = 'cart_items';
    this.itemCartCollectionFieldId = 'id';
  }

  /**
   * Returns true if the `product` description is greater than the 90 otherwise false.
   */
  public isClamped(product: Product): boolean {
    return product.description.length > 90;
  }

  public productDetailsPopup(product: Product) {
    // TODO: Display the product details popup
    console.log('Product Details: ', product.id, product.name);
  }

  public addProductToCart(product: Product) {
    console.log('Add Product to Cart: ', product.id);
    // TODO: Add item to the cart
    let cartItem: CartItem = new CartItem(
      String(product.id),
      product.name,
      product.description,
      product.image,
      product.price,
      product.manufacturer,
      Number(1) // TODO: Change the logic here
    );

    this.isProductInCart(
      this.itemCartCollectionName,
      this.itemCartCollectionFieldId,
      product.id
    ).subscribe((exists: boolean) => {
      if (exists) {
        // TODO: Navigate to the cart.
        this.router.navigate(['/cart']);
      } else {
        // Add item to the firestore collection
        this.fireStore
          .collection(this.itemCartCollectionName)
          .add(cartItem.toPlainObject());
      }
    });
  }

  private isProductInCart(
    collectionName: string,
    fieldName: string,
    fieldValue: any
  ): Observable<boolean> {
    return this.fireStore
      .collection(collectionName, (ref) =>
        ref.where(fieldName, '==', fieldValue)
      )
      .get()
      .pipe(map((querySnapshot: QuerySnapshot<any>) => !querySnapshot.empty));
  }
}
