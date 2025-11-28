import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login2',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    this.errorMsg = '';

    const email = this.email.trim();
    const password = this.password.trim();

    if (!email || !password) {
      this.errorMsg = 'Completa correo y contraseña.';
      return;
    }

    this.auth.login(email, password).then((ok) => {
      if (ok) {
        this.router.navigateByUrl('/home2', { replaceUrl: true });
      } else {
        this.errorMsg = 'Correo o contraseña incorrectos.';
      }
    });
  }

  goRegister() {
    this.router.navigateByUrl('/register2');
  }
}
