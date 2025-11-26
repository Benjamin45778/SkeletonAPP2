import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    // Preguntamos a Storage si hay sesión activa
    const isLogged = await this.auth.isLoggedInAsync();

    if (isLogged) {
      return true;
    }

    // Si no hay sesión, redirigimos al login
    return this.router.parseUrl('/login2');
  }
}