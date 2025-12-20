import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Storage } from '@ionic/storage-angular';

type Plan = {
  id?: number;
  nombre?: string;
  name?: string;
  descripcion?: string;
  description?: string;
  precio?: number;
  price?: number;
};

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {
  
  planes: Plan[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {}

  async ngOnInit() {
    await this.storage.create();

    // si ya existía cache antiguo lo usamos
    const cached = await this.storage.get('planes_cache');
    if (cached?.length) {
      this.planes = cached;
      return;
    }

    
    this.planes = [
      {
        id: 1,
        nombre: 'Plan Básico',
        descripcion: 'Acceso estándar y funciones esenciales.',
        precio: 9990,
      },
      {
        id: 2,
        nombre: 'Plan Pro',
        descripcion: 'Mejor rendimiento, más opciones y soporte.',
        precio: 12990,
      },
      {
        id: 3,
        nombre: 'Plan Premium',
        descripcion: 'Todo incluido: máxima experiencia.',
        precio: 15990,
      },
    ];

    await this.storage.set('planes_cache', this.planes);
  }

  
  async seleccionarPlan(p: Plan) {
    await this.storage.set('plan_seleccionado', p);

    const toast = await this.toastCtrl.create({
      message: `Plan seleccionado: ${p.nombre ?? p.name ?? 'Plan'}`,
      duration: 1500,
    });
    await toast.present();
  }
}
