import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private afs:AngularFirestore

  ) { }

  login(email : string, password : string ) {
    this.fireAuth.signInWithEmailAndPassword(email,password).then( res => {
        let userRole = this.getUserType(email);
        localStorage.setItem('token', userRole);
        this.router.navigate(['']);
    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  register(email : string, password : string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then( res =>
      {
          alert('Registration Successful');
          this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/signup']);
    })

  }

  // sign out

  logout() {
    this.fireAuth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  private getUserType(email : string): string{
    let userType: string = "guest";

    // TODO: Get the user type from firebase
    // this.afs.collection("users").get();

    if(email == "admin@gmail.com") {
      userType = "admin";
    } else {
      userType = "user";
    }

    return userType;
  }
}