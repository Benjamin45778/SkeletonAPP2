import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Register2Page {
  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
  ) {}

  async onRegister() {
    this.errorMsg = '';

    const email = this.email.trim();
    const pass = this.password.trim();
    const pass2 = this.confirmPassword.trim();

    if (!email || !pass || !pass2) {
      this.errorMsg = 'Completa todos los campos.';
      return;
    }

    if (pass !== pass2) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }

    const ok = await this.auth.register({ email, password: pass });

    if (!ok) {
      this.errorMsg = 'El correo ya está registrado.';
      return;
    }

    const toast = await this.toastCtrl.create({
      message: 'Registro exitoso',
      duration: 1200,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();

    await this.router.navigateByUrl('/login2', { replaceUrl: true });
  }

  goLogin() {
    this.router.navigateByUrl('/login2');
  }
}
