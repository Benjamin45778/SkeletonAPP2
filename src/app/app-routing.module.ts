import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login2',
    pathMatch: 'full'
  },
  {
    path: 'login2',
    loadComponent: () =>
      import('./pages/login2/login2.page').then(m => m.Login2Page)
  },
  {
    path: 'register2',
    loadComponent: () =>
      import('./pages/register2/register2.page').then(m => m.Register2Page)
  },
  {
    path: 'home2',
    loadComponent: () =>
      import('./pages/home2/home2.page').then(m => m.Home2Page)
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./pages/tasks/tasks.page').then(m => m.TasksPage)
  },
  {
    path: 'camara',
    loadComponent: () =>
      import('./pages/camara/camara.page').then(m => m.CamaraPage)
  },
  {
    path: 'mapa',
    loadComponent: () =>
      import('./pages/mapa/mapa.page').then(m => m.MapaPage)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
