import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private router: Router, private auth: AngularFireAuth) {}

  resetPassword() {
    this.auth.sendPasswordResetEmail(this.email)
      .then(() => {
        alert('Password reset email sent. Check your inbox.');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        alert('Failed to send reset email. Please check your email address.');
        console.error(error);
      });
  }
}
