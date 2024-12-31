import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todos.store';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, TodosListComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  store = inject(TodosStore)
  title = 'ngrx-signal';
  ngOnInit(): void {
    this.loadTodos().then(()=> console.log("Todos Loaded!"))

  }
  async loadTodos() {
    await this.store.loadAll()
  }
}
