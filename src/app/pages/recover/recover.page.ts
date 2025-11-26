import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  standalone: true,
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RecoverPage {
  email = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async onRecover() {
    const alert = await this.alertController.create({
      header: 'Recuperar contraseña',
      message: 'Si el correo existe, te enviaremos instrucciones. (Demo)',
      buttons: ['Aceptar'],
    });

    await alert.present();
    this.router.navigate(['/login2']);
  }
}
