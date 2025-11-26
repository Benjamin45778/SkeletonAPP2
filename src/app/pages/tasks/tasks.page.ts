import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FakeApiService, Task } from '../../services/fake-api.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss']
})
export class TasksPage implements OnInit {

  tasks: Task[] = [];
  newTitle = '';
  loading = false;
  errorMsg = '';

  constructor(private api: FakeApiService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(event?: any) {
    this.loading = true;
    this.errorMsg = '';

    this.api.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      },
      error: (err: any) => {
        this.errorMsg = String(err);
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  addTask() {
    if (!this.newTitle.trim()) return;

    const task: Task = { title: this.newTitle.trim(), done: false };

    this.api.addTask(task).subscribe({
      next: () => {
        this.newTitle = '';
        this.loadTasks();
      },
      error: (err: any) => {
        this.errorMsg = String(err);
      }
    });
  }

  toggleDone(t: Task) {
    const updated: Task = { ...t, done: !t.done };

    this.api.updateTask(updated).subscribe({
      next: () => {
        t.done = !t.done;
      },
      error: (err: any) => {
        this.errorMsg = String(err);
      }
    });
  }

  deleteTask(t: Task) {
    if (!t.id) return;

    this.api.deleteTask(t.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(x => x.id !== t.id);
      },
      error: (err: any) => {
        this.errorMsg = String(err);
      }
    });
  }
}
