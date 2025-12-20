import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

const authGuard = async () => {
  const storage = inject(Storage);
  const router = inject(Router);

  await storage.create();
  const token = await storage.get('token');

  if (!token) {
    router.navigateByUrl('/login2');
    return false;
  }
  return true;
};

const routes: Routes = [
  { path: '', redirectTo: 'login2', pathMatch: 'full' },

  {
    path: 'login2',
    loadComponent: () => import('./pages/login2/login2.page').then(m => m.Login2Page),
  },

  {
    path: 'home2',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home2/home2.page').then(m => m.Home2Page),
  },

  {
    path: 'tasks',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/tasks/tasks.page').then(m => m.TasksPage),
  },

  {
    path: 'catalog',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/catalog/catalog.page').then(m => m.CatalogPage),
  },

  {
    path: 'camara',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/camara/camara.page').then(m => m.CamaraPage),
  },

  {
    path: 'mapa',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/mapa/mapa.page').then(m => m.MapaPage),
  },

  { path: '**', redirectTo: 'login2' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
