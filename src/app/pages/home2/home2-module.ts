import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { Home2Page } from './home2.page';
import { MisDatosComponent } from '../mis-datos/mis-datos.component';
import { ExperienciaComponent } from '../experiencia/experiencia.component';
import { CertificacionesComponent } from '../certificaciones/certificaciones.component';

const routes: Routes = [
  {
    path: '',
    component: Home2Page,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    Home2Page,
    MisDatosComponent,
    ExperienciaComponent,
    CertificacionesComponent,
  ],
})
export class Home2PageModule {}
