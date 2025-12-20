import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { StorageService } from './storage.service';

export type TaskItem = {
  id: number;
  title: string;
  completed?: boolean;
};

export type Plan = {
  id?: number;
  nombre?: string;   // tu modelo real
  name?: string;     // por compatibilidad
  precio?: number;
  price?: number;
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient, private storage: StorageService) {}

  // Tasks con cache offline
  async getTasks(): Promise<TaskItem[]> {
    const cacheKey = 'tasks_cache';
    try {
      const data = await firstValueFrom(
        this.http.get<TaskItem[]>(`${this.base}/todos?_limit=10`)
      );
      await this.storage.set(cacheKey, data);
      return data;
    } catch {
      return (await this.storage.get<TaskItem[]>(cacheKey)) ?? [];
    }
  }

  // Si tu catálogo viene de otra API, ajusta URL aquí.
  // Mientras tanto ejemplo simple con cache:
  async getPlans(): Promise<Plan[]> {
    const cacheKey = 'plans_cache';
    try {
      // ejemplo: usa /users como "planes" demo
      const raw = await firstValueFrom(
        this.http.get<any[]>(`${this.base}/users?_limit=6`)
      );
      const plans: Plan[] = raw.map(u => ({
        id: u.id,
        nombre: u.company?.name ?? `Plan ${u.id}`,
        precio: 9990 + u.id * 1000,
      }));
      await this.storage.set(cacheKey, plans);
      return plans;
    } catch {
      return (await this.storage.get<Plan[]>(cacheKey)) ?? [];
    }
  }
}
