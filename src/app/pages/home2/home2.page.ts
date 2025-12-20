import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Home2Page {
  email = '';

  constructor(private router: Router) {}

  goTasks() { this.router.navigateByUrl('/tasks'); }
  goCatalog() { this.router.navigateByUrl('/catalog'); }
  goMisDatos() { this.router.navigateByUrl('/mis-datos'); }
  goExperiencia() { this.router.navigateByUrl('/experiencia'); }
  goCertificaciones() { this.router.navigateByUrl('/certificaciones'); }
  goCamara() { this.router.navigateByUrl('/camara'); }
  goMapa() { this.router.navigateByUrl('/mapa'); }

  logout() { this.router.navigateByUrl('/login2'); }
}
