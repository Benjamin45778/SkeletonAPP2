import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class MisDatosComponent {
  // Aquí va la info personal que antes ibas a mostrar en Home
  nombres = '';
  apellidos = '';
  correo = '';
  telefono = '';
  direccion = '';
}
