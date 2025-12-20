import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

export interface CertItem {
  // Campos principales
  nombre?: string;
  institucion?: string;

  // Extras opcionales por si tu HTML los menciona
  title?: string;
  entidad?: string;
  organizacion?: string;
  issuer?: string;
}

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CertificacionesComponent {
  certNombre: string = '';
  certInstitucion: string = '';

  certificaciones: CertItem[] = [];

  constructor(private toastCtrl: ToastController) {}

  agregarCertificacion() {
    const nombre = (this.certNombre || '').trim();
    const institucion = (this.certInstitucion || '').trim();
    if (!nombre) return;

    this.certificaciones.unshift({ nombre, institucion });
    this.certNombre = '';
    this.certInstitucion = '';
  }

  async guardarCambios() {
    const toast = await this.toastCtrl.create({
      message: 'Certificaciones guardadas ✅',
      duration: 1400,
      position: 'bottom',
    });
    await toast.present();
  }
}
