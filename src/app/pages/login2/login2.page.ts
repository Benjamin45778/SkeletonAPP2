import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
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

  constructor(
    private router: Router,
    private auth: AuthService,
    private toastCtrl: ToastController,
  ) {}

  async login() {
    this.errorMsg = '';

    const email = this.email.trim();
    const pass = this.password.trim();

    if (!email || !pass) {
      this.errorMsg = 'Completa ambos campos.';
      return;
    }

    const ok = await this.auth.login(email, pass);

    if (!ok) {
      this.errorMsg = 'Correo o contraseña incorrectos.';
      const t = await this.toastCtrl.create({
        message: this.errorMsg,
        duration: 1500,
        position: 'bottom',
        color: 'danger',
      });
      await t.present();
      return;
    }

    const t = await this.toastCtrl.create({
      message: 'Login exitoso',
      duration: 1000,
      position: 'bottom',
      color: 'success',
    });
    await t.present();

    // Ir al home y reemplazar el historial para que no pueda volver al login con “atrás”
    this.router.navigateByUrl('/home2', { replaceUrl: true });
  }

  goRegister() {
    this.router.navigateByUrl('/register2');
  }
}
