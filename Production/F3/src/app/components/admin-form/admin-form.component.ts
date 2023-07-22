import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent {
  fertilizerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AdminFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private formBuilder: FormBuilder
  ) {
    this.fertilizerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [, [Validators.required, Validators.min(1)]],
      imageUrl: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.fertilizerForm.valid) {
      // TODO: Handle form submission here, e.g., save data to a service or API
      console.log(this.fertilizerForm.value);
      this.fertilizerForm.reset(); // Optional: Reset the form after submission
    }
  }
}
