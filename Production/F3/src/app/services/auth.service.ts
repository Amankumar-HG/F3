import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { User } from '../data/user';
import { UserTypes } from '../data/user-types.enum';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userType: UserTypes;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
  ) {
    this.userType = UserTypes.Guest;
  }

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.router.navigate(['login']);
      },
      (err) => {
        this.router.navigate(['signup']);
      }
    );
  }

  async login(email: string, password: string) {
    try {
      const user = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const userType = await this.getUserType(email);
      const tokenValue = new User(userType, '', email).toPlainObject();
      localStorage.setItem('token', JSON.stringify(tokenValue));
      this.router.navigate(['']);
    } catch (err) {
      alert(err);
      this.router.navigate(['login']);
    }
  }

  private async getUserType(email: string): Promise<UserTypes> {
    try {
      let usersSnapshot = await this.afs.collection<User>('users').get().toPromise();
      if (usersSnapshot != null) {
        for (const user of usersSnapshot.docs) {
          const userData = user.data();
          if (userData != null) {
            if (email.toLowerCase() === userData.email?.toLowerCase()) {
              return userData.userType === 'admin' ? UserTypes.Admin : UserTypes.User;
            }
          }
        }
      }
      return UserTypes.User; 
    } catch (error) {
      // Handle any errors that occur during the Firestore query
      console.error('Error fetching user type:', error);
      throw error;
    }
  }

  async logInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.fireAuth.signInWithPopup(provider);
      return result.user;
    } catch (error) {
      console.error('Error during Google Sign-in:', error);
      throw error;
    }
  }

  async logOut() {
    try {
      await this.fireAuth.signOut();
      localStorage.clear();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during Sign-out:', error);
      throw error;
    }
  }

  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.fireAuth.signInWithPopup(provider);
      return result.user;
    } catch (error) {
      console.error('Error during Google Sign-in:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await this.fireAuth.signOut();
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error during Sign-out:', error);
      throw error;
    }
  }
}
