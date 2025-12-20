import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createAnimation } from '@ionic/angular';

@Component({
  selector: 'app-login2',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page {
  @ViewChild('loginCard', { read: ElementRef }) loginCard!: ElementRef;

  email = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router) {}

  ionViewDidEnter() {
    const el = this.loginCard?.nativeElement;
    if (!el) return;

    createAnimation()
      .addElement(el)
      .duration(500)
      .easing('cubic-bezier(0.2, 0.8, 0.2, 1)')
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(14px)', 'translateY(0px)')
      .play();
  }

  login() {
    this.errorMsg = '';

    if (!this.email || !this.password) {
      this.errorMsg = 'Completa correo y contraseña';
      return;
    }

    this.router.navigateByUrl('/home2');
  }

  goRegister() {
    this.router.navigateByUrl('/register2');
  }
}
