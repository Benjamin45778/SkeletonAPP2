import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page {
  email = '';

  constructor(private router: Router, private auth: AuthService) {
    if (this.auth && typeof this.auth.getEmail === 'function') {
      this.email = this.auth.getEmail() || '';
    }
  }

  logout() {
    if (this.auth && typeof this.auth.logout === 'function') {
      this.auth.logout();
    }
    this.router.navigateByUrl('/login2', { replaceUrl: true });
  }

  goTasks() {
    this.router.navigateByUrl('/tasks');
  }

  goCatalog() {
    this.router.navigateByUrl('/catalog');
  }

  goMisDatos() {
    this.router.navigateByUrl('/mis-datos');
  }

  goExperiencia() {
    this.router.navigateByUrl('/experiencia');
  }

  goCertificaciones() {
    this.router.navigateByUrl('/certificaciones');
  }

  goCamara() {
    this.router.navigateByUrl('/camara');
  }

  goMapa() {
    this.router.navigateByUrl('/mapa');
  }
}
