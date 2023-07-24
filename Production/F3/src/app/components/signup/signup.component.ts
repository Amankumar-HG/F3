import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public registerForm: FormGroup;
  public username: string;
  public email: string;
  public password: string;
  public phone: number;
  
  constructor(
    private formBuilder: FormBuilder,  
    private router: Router, 
    private firestore: Firestore,
    private fireAuth:AngularFireAuth
    ) {  
    // Initialize the registerForm using FormBuilder

    this.registerForm = formBuilder.group({
      username: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ])
      ),
      email: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      phone: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10}'), // Pattern for a 10-digit phone number
      ])),
    });

    this.username = "";
    this.email = "";
    this.password = "";
    this.phone = 0;
  }

  ngOnInit(): void {
    //...
  }

  public signup(form: any): void {
    this.email = form.value.email;
    this.password = form.value.password
    // Create a new user with email and password using AngularFireAuth
    this.fireAuth.createUserWithEmailAndPassword(this.email, this.password).then((res: any) =>   
    {
      const collectionInstance = collection(this.firestore, 'users');   // Create a Firestore collection reference for 'users'
      addDoc(collectionInstance, form.value).then(() => {                    // Add the form value (user details) to the 'users' collection
        alert('User added successfully');
        console.log()
      }).catch((error: any) => {
        console.log(error);
      })
      alert('Registration Successful');
      this.router.navigate(['login'])                                // Navigate to the login page after successful registration
      const user = {
        email: this.email,
        password: this.password
      }
      //adding user to the db
    },

      (err: { message: any; }) => {
        // alert('HII')
        alert(err.message);
        this.router.navigate(['signup']);                                // Navigate back to the registration page on error
      })
  }
}
