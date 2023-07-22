import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewProduct } from 'src/app/data/new-product';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent {
  public collectionProductsName: string;
  public fertilizerForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewProduct,
    private fireStore: AngularFirestore,
    public dialogRef: MatDialogRef<AdminFormComponent>,
    private formBuilder: FormBuilder
  ) {
    this.collectionProductsName = 'products';
    this.fertilizerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [, [Validators.required, Validators.min(1)]],
      imageUrl: ['', Validators.required],
    });
  }

  public onSubmit() {
    if (this.fertilizerForm.valid) {
      // TODO: Handle form submission here, e.g., save data to a service or API
      // TODO: Get the id of the admin who is currently logged in.
      let manufacturer = 'admin';
      let newProduct = new NewProduct(
        this.fertilizerForm.value.name,
        this.fertilizerForm.value.description,
        this.fertilizerForm.value.price,
        this.fertilizerForm.value.imageUrl,
        manufacturer
      );

      this.fireStore.collection(this.collectionProductsName).add(newProduct.toPlainObject());
      this.fertilizerForm.reset(); // Optional: Reset the form after submission
      this.dialogRef.close();
    }
  }
}
