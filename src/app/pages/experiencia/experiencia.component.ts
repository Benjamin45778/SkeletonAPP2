import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ExperienciaComponent {
  empresa = '';
  anioInicio: number | null = null;
  trabajaActualmente = false;
  anioTermino: number | null = null;
  cargo = '';
}
