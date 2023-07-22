import { Component, OnInit } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { CardService } from 'src/app/services/card.service';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/data/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private itemCartCollectionName: string;
  public productList: Product[];

  constructor(private afs: AngularFirestore, private cardService: CardService) {
    this.itemCartCollectionName = 'products';
    this.productList = [];
  }

  public ngOnInit(): void {
    this.getProductList().subscribe((querySnapshot: QuerySnapshot<Product>) => {
      querySnapshot.docs.map((doc) => {
        let docId = doc.id;
        let data = doc.data();
        this.productList.push(new Product(
          docId,
          data.name,
          data.description,
          data.price,
          data.image,
          data.manufacturer
        ));
      });
    });
  }

  public getProductList(): Observable<QuerySnapshot<any>>  {
    return this.afs.collection(this.itemCartCollectionName).get();
  }
}
