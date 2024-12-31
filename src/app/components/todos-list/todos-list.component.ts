import { Component, effect, inject, OnInit, viewChild } from '@angular/core';
import {MatFormField,  MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule, MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgFor, NgStyle } from '@angular/common';
import { TodosFilter, TodosStore } from '../../store/todos.store';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatIconModule,
    MatSuffix,
    MatLabel,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    NgFor,
    NgStyle
  ]
})
export class TodosListComponent implements OnInit {

  constructor() {
    effect(()=> {
      this.filter().value
    })
  }
  store = inject(TodosStore)
  filter = viewChild.required(MatButtonToggleGroup)

  ngOnInit() {
  }

  async onAddTodo(title: string) {
    await this.store.addTodo(title)
  }
  async onDelete(id: string, event:MouseEvent) {
    event.stopPropagation()
    await this.store.deleteTodo(id)
  }

  async onUpdate(id: string, event: boolean) {
    console.log(event)
    await this.store.updateTodo(id, event)
  }

  onFilterChange(filter: TodosFilter) {
    this.store.updateFilter(filter)
  }

}
