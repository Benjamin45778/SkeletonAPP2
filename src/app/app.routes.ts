import { Routes } from '@angular/router';

// Pages / components
import { Login2Page } from './pages/login2/login2.page';
import { Register2Page } from './pages/register2/register2.page';
import { RecoverPage } from './pages/recover/recover.page';
import { Home2Page } from './pages/home2/home2.page';
import { TasksPage } from './pages/tasks/tasks.page';
import { CamaraPage } from './pages/camara/camara.page';
import { MapaPage } from './pages/mapa/mapa.page';
import { MisDatosComponent } from './pages/mis-datos/mis-datos.component';
import { CatalogPage } from './pages/catalog/catalog.page';
import { ExperienciaComponent } from './pages/experiencia/experiencia.component';
import { CertificacionesComponent } from './pages/certificaciones/certificaciones.component';
import { NotFoundPage } from './pages/not-found/not-found.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login2', pathMatch: 'full' },

  // PÚBLICO
  { path: 'login2', component: Login2Page },
  { path: 'register2', component: Register2Page },
  { path: 'recover', component: RecoverPage },

  // PRIVADO (verificación se hace dentro de Home2)
  { path: 'home2', component: Home2Page },
  { path: 'tasks', component: TasksPage },
  { path: 'camara', component: CamaraPage },
  { path: 'mapa', component: MapaPage },
  { path: 'mis-datos', component: MisDatosComponent },
  { path: 'catalog', component: CatalogPage },
  { path: 'experiencia', component: ExperienciaComponent },
  { path: 'certificaciones', component: CertificacionesComponent },

  // 404
  { path: '404', component: NotFoundPage },
  { path: '**', redirectTo: '404' },
];
