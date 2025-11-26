import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CertificacionesComponent {
  nombreCertificado = '';
  fechaObtencion = '';
  tieneVencimiento = false;
  fechaVencimiento = '';
}
