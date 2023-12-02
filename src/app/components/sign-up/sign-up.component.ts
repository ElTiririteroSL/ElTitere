import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private authService: AuthService) {}

  signUp(email: string, confirmEmail: string, password: string, confirmPassword: string, username: string) {
    if (email !== confirmEmail) {
      alert('Email and Confirm Email must match.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password and Confirm Password must match.');
      return;
    }

    if (!username) {
      alert('Username cannot be empty.');
      return;
    }

    if (!this.isValidEmail(email)) {
      alert('Invalid email format.');
      return;
    }

    this.authService.signUpWithEmailAndPassword(email, password, username);
  }

  private isValidEmail(email: string): boolean {
    // Expresión regular para validar el formato de una dirección de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
