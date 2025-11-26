import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Task {
  id?: number;
  title: string;
  done: boolean;
}

const STORAGE_TASKS = 'tasks_cache';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.storage.create();
  }

  // Obtener tareas: primero intenta API, si falla usa cache (persistencia)
  getTasks(): Observable<Task[]> {
    return this.http.get<any[]>(`${this.apiUrl}?_limit=5`).pipe(
      map(data =>
        data.map(d => ({
          id: d.id,
          title: d.title,
          done: d.completed,
        }) as Task)
      ),
      tap(tasks => {
        // guardamos en cache para modo offline
        this.storage.set(STORAGE_TASKS, tasks);
      }),
      catchError(err => {
        // si hay error 404 / sin internet → intentamos cargar desde cache
        return new Observable<Task[]>(subscriber => {
          this.storage.get(STORAGE_TASKS).then((cached: Task[] | null) => {
            if (cached && cached.length > 0) {
              subscriber.next(cached);
              subscriber.complete();
            } else {
              subscriber.error('Error al conectar con la API y no hay datos almacenados.');
            }
          });
        });
      })
    );
  }

  // Crear tarea solo en storage local (no en la API real)
  addTask(task: Task): Observable<Task> {
    return new Observable<Task>(subscriber => {
      this.storage.get(STORAGE_TASKS).then((list: Task[] | null) => {
        const tasks = list || [];
        const newTask: Task = {
          ...task,
          id: tasks.length ? ((tasks[tasks.length - 1].id || 0) + 1) : 1,
        };
        tasks.push(newTask);
        this.storage.set(STORAGE_TASKS, tasks).then(() => {
          subscriber.next(newTask);
          subscriber.complete();
        });
      });
    });
  }

  // Actualizar tarea en storage local
  updateTask(task: Task): Observable<Task> {
    if (task.id == null) {
      return throwError(() => new Error('Task sin id'));
    }

    return new Observable<Task>(subscriber => {
      this.storage.get(STORAGE_TASKS).then((list: Task[] | null) => {
        let tasks = list || [];
        tasks = tasks.map(t => t.id === task.id ? task : t);
        this.storage.set(STORAGE_TASKS, tasks).then(() => {
          subscriber.next(task);
          subscriber.complete();
        });
      });
    });
  }

  // Eliminar tarea del storage
  deleteTask(id: number): Observable<void> {
    return new Observable<void>(subscriber => {
      this.storage.get(STORAGE_TASKS).then((list: Task[] | null) => {
        const tasks = (list || []).filter(t => t.id !== id);
        this.storage.set(STORAGE_TASKS, tasks).then(() => {
          subscriber.next();
          subscriber.complete();
        });
      });
    });
  }
}