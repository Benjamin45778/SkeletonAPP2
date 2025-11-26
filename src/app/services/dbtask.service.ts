import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {

  private api = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.api);
  }

  addTask(task: any) {
    return this.http.post(this.api, task).toPromise();
  }

  updateTask(task: any) {
    return this.http.put(`${this.api}/${task.id}`, task).toPromise();
  }

  deleteTask(id: any) {
    return this.http.delete(`${this.api}/${id}`).toPromise();
  }
}
