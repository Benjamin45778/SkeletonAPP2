import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ExperienciaComponent {
  empresa: string = '';
  anioInicio: number | null = null;

  actual: boolean = false;
  anioTermino: number | null = null;

  cargo: string = '';

  constructor(private toastCtrl: ToastController) {}

  async guardar() {
    // si está "actual", no exigimos año término
    if (this.actual) this.anioTermino = null;

    const toast = await this.toastCtrl.create({
      message: 'Experiencia guardada ✅',
      duration: 1400,
      position: 'bottom',
    });
    await toast.present();
  }
}
