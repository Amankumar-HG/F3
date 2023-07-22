import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/interfaces/cart-items';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  public dataSource: CartItem[] = [];
  displayedColumns: string[] = [
    'demo-id',
    'demo-image',
    'demo-name',
    'demo-price',
    'demo-quantity',
    'demo-item-total',
    'demo-actions'
  ];
  private amount:number;
 
  constructor(private cardService: CardService,public router: Router,public route: ActivatedRoute) {
    this.fetchDataFromFirebase();
    this.amount = 0;
  }

  public fetchDataFromFirebase() {
    this.cardService.getCartItems().subscribe((data: any[]) => {
      this.dataSource = data.map((item) => ({
        id: item.payload.doc.id,
        imageurl: item.payload.doc.data().imageurl,
        name: item.payload.doc.data().name,
        price: item.payload.doc.data().price,
        quantity: item.payload.doc.data().quantity,
        itemTotal: item.payload.doc.data().itemTotal,
      }));
    });
  }

  public addItemToCart(item: CartItem){
    this.cardService.addCartItem(item).then(() => {
      console.log('Item added to cart.');
    }).catch((error) => {
      console.error('Error adding item to cart:', error);
    });
  }

  public removeItem(item: CartItem) {
    this.cardService.removeCartItem(item.id).then(() => {
      console.log('Item removed from cart.');
      this.calculateItemTotalSum(); 
    }).catch((error) => {
      console.error('Error removing item from cart:', error);
    });
  }

  public incrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity++;
      this.updateItemTotal(item);
      this.calculateItemTotalSum();
      this.cardService.updateCartItem(item).then(() => {
        console.log('Item quantity updated.');
      }).catch((error) => {
        console.error('Error updating item quantity:', error);
      });
    } 
  }
  
  public decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateItemTotal(item);
      this.calculateItemTotalSum();
      this.cardService.updateCartItem(item).then(() => {
        console.log('Item quantity updated.');
      }).catch((error) => {
        console.error('Error updating item quantity:', error);
      });
    } else {
      this.removeItem(item);
    }
  }

  public updateItemTotal(item: CartItem) {
    item.itemTotal = item.quantity * item.price;
  }

  public calculateItemTotalSum() {
    let sum = 0;
    if (this.dataSource) {
      this.dataSource.forEach((item:CartItem) => {
        sum += item.itemTotal;
      });
    }
    this.amount=sum;
    return sum;
  }
  public redirectToPaymentPage(): void {
    this.router.navigate(['/payment',this.amount]);
  }
}
