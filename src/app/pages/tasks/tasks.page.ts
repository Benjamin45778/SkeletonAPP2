import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../../services/fake-api.service';

type TaskItem = { id: number; title: string; completed?: boolean };

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: TaskItem[] = [];
  loading = false;

  
  newTask = '';

  constructor(
    private api: ApiService,
    private storage: Storage,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    await this.load();
  }

  async load(event?: any) {
    this.loading = true;

    try {
      // tu servicio devuelve Promise → await
      const data: any = await this.api.getTasks();

      const normalized: TaskItem[] = (data ?? []).map((x: any, i: number) => {
        if (typeof x === 'string') return { id: i + 1, title: x };
        return {
          id: Number(x.id ?? i + 1),
          title: String(x.title ?? x.nombre ?? 'Tarea'),
          completed: Boolean(x.completed ?? false),
        };
      });

      this.tasks = normalized;
      await this.storage.set('tasks_cache', normalized);
    } catch {
      // fallback offline
      this.tasks = (await this.storage.get('tasks_cache')) ?? [];

      const t = await this.toastCtrl.create({
        message: 'Sin internet: mostrando datos guardados (cache).',
        duration: 2000,
      });
      await t.present();
    } finally {
      this.loading = false;
      event?.target?.complete?.();
    }
  }

  
  async addTask() {
    const text = this.newTask.trim();
    if (!text) return;

    const nextId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    this.tasks.unshift({ id: nextId, title: text, completed: false });
    this.newTask = '';

    await this.storage.set('tasks_cache', this.tasks);

    const t = await this.toastCtrl.create({
      message: 'Tarea agregada (guardada en cache).',
      duration: 1200,
    });
    await t.present();
  }

  
  async deleteTask(t: TaskItem) {
    this.tasks = this.tasks.filter(x => x.id !== t.id);
    await this.storage.set('tasks_cache', this.tasks);

    const toast = await this.toastCtrl.create({
      message: 'Tarea eliminada.',
      duration: 1200,
    });
    await toast.present();
  }
}
