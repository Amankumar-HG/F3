import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserTypes } from 'src/app/data/user-types.enum';
import { User } from 'src/app/data/user';

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public userTypes = UserTypes;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firestore: Firestore,
    private fireAuth: AngularFireAuth,
    private googleAuthService: AuthService
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
      phone: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{10}'), // Pattern for a 10-digit phone number
        ])
      ),
      userType: this.formBuilder.control(
        this.userTypes.User,
        Validators.required
      ),
    });
  }

  ngOnInit(): void {
    //...
  }

  public signup(form: any): void {
    let email = form.value.email;
    let password = form.value.password;

    // Create a new user with email and password using AngularFireAuth
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      (res: any) => {
        const collectionInstance = collection(this.firestore, 'users'); // Get the collection instance
        addDoc(collectionInstance, form.value); // Add new user to the collection
        this.router.navigate(['login']); // Navigate to the login page after successful registration
      },
      (err: { message: any }) => {
        this.router.navigate(['signup']); // Navigate back to the registration page on error
      }
    );
  }

  async signUpWithGoogle() {
    try {
      const user = await this.googleAuthService.signInWithGoogle();
      const tokenValue = new User(UserTypes.User, '', (user?.email != null ? user.email : '')).toPlainObject();
      localStorage.setItem('token', JSON.stringify(tokenValue));
      this.router.navigate(['']); // Navigate to the Home page.
      // Here, you can handle the user data and any additional steps you may require.
    } catch (error) {
      console.error('Error during Google Sign-in:', error);
    }
  }

  async signOut() {
    try {
      await this.googleAuthService.signOut();
      console.log('Sign-out successful!');
      localStorage.clear();
      // Perform any additional tasks after successful sign-out.
    } catch (error) {
      console.error('Error during Sign-out:', error);
    }
  }
}
