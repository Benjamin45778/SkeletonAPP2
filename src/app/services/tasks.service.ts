import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

export interface Task {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TasksService {
  private storageReady: Promise<void>;
  private cacheKey = 'tasks_cache';
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient, private storage: Storage) {
    this.storageReady = this.storage.create().then(() => undefined);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap(async (data: Task[]) => {
        await this.storageReady;
        await this.storage.set(this.cacheKey, data);
      }),
      catchError(() => this.getTasksFromCache())
    );
  }

  private getTasksFromCache(): Observable<Task[]> {
    return from(this.storageReady).pipe(
      switchMap(() => from(this.storage.get(this.cacheKey) as Promise<Task[] | null>)),
      switchMap((cached) => of(cached ?? []))
    );
  }
}
