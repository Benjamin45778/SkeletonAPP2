import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login2',
    pathMatch: 'full',
  },
  {
    path: 'login2',
    loadComponent: () =>
      import('./pages/login2/login2.page').then((m) => m.Login2Page),
  },
  {
    path: 'register2',
    loadComponent: () =>
      import('./pages/register2/register2.page').then((m) => m.Register2Page),
  },
  {
    path: 'recover',
    loadComponent: () =>
      import('./pages/recover/recover.page').then((m) => m.RecoverPage),
  },
  {
    path: 'home2',
    loadComponent: () =>
      import('./pages/home2/home2.page').then((m) => m.Home2Page),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./pages/tasks/tasks.page').then((m) => m.TasksPage),
  },
  {
    path: 'catalog',
    loadComponent: () =>
      import('./pages/catalog/catalog.page').then((m) => m.CatalogPage),
  },
  {
    path: 'mis-datos',
    loadComponent: () =>
      import('./pages/mis-datos/mis-datos.component').then(
        (m) => m.MisDatosComponent
      ),
  },
  {
    path: 'experiencia',
    loadComponent: () =>
      import('./pages/experiencia/experiencia.component').then(
        (m) => m.ExperienciaComponent
      ),
  },
  {
    path: 'certificaciones',
    loadComponent: () =>
      import('./pages/certificaciones/certificaciones.component').then(
        (m) => m.CertificacionesComponent
      ),
  },
  {
    path: 'camara',
    loadComponent: () =>
      import('./pages/camara/camara.page').then((m) => m.CamaraPage),
  },
  {
    path: 'mapa',
    loadComponent: () =>
      import('./pages/mapa/mapa.page').then((m) => m.MapaPage),
  },
  {
    path: '**',
    redirectTo: 'login2',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
