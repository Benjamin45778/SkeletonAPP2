import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MisDatosComponent {
  // Compatibilidad con tu TS anterior (si usabas "nombres")
  nombres: string = '';
  correo: string = '';
  fechaNacimiento: string = '';

  // Para que tu HTML no reviente si usa "nombre"
  get nombre(): string {
    return this.nombres;
  }
  set nombre(v: string) {
    this.nombres = v;
  }

  constructor(private toastCtrl: ToastController) {}

  async guardarCambios() {
    const toast = await this.toastCtrl.create({
      message: 'Cambios guardados ✅',
      duration: 1400,
      position: 'bottom',
    });
    await toast.present();
  }
}
