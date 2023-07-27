import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypes } from 'src/app/data/user-types.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router:Router) {} // Inject the AuthService in the constructor to handle login authentication

  ngOnInit(): void {
    // Lifecycle hook: ngOnInit is called after the component is initialized
  }

  login() {
    // Method to handle user login
    if (this.email == '') {
      alert('Please enter a email');
      return;
    }

    if (this.password == '') {
      alert('Please Enter Password');
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = ''; // Clear the email and password fields after login is initiated
    this.password = '';
  }
  
  async logInWithGoogle() {
    try {
      const user = await this.auth.signInWithGoogle();
      localStorage.setItem('token', UserTypes.User);
      this.router.navigate([""]); // Navigate to the Home page.
      // Here, you can handle the user data and any additional steps you may require.
    } catch (error) {
      console.error('Error during Google Sign-in:', error);
    }
  }

  async logOut() {
    try {
      await this.auth.signOut();
      console.log('Sign-out successful!');
      // Perform any additional tasks after successful sign-out.
    } catch (error) {
      console.error('Error during Sign-out:', error);
    }
  }
}
