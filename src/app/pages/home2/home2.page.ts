import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  email = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const logged = await this.auth.isLoggedInAsync();
    if (!logged) {
      // si no hay sesión → al login
      this.router.navigateByUrl('/login2', { replaceUrl: true });
      return;
    }
    this.email = this.auth.getEmail();
  }

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/login2', { replaceUrl: true });
  }
}