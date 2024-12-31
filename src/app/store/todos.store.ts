import { Todo } from "../model/todo.model"

import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { TodoService } from "../services/todo.service";
import { computed, inject } from "@angular/core";

export type TodosFilter = "all" | "pending"|"completed"

type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: "completed"
}

export const TodosStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed((state)=>({
    filteredTodos: computed(()=> {
      const todos = state.todos()
        switch(state.filter()) {
          case 'all': return todos
          case 'completed': return todos.filter(todo=> todo.completed)
          case 'pending': return todos.filter(todo=> !todo.completed)
        }
    })
  })),
  withMethods(
    (store, todoService = inject(TodoService)) => ({
      async loadAll() {
        patchState(store, {loading: true})
        const todos = await todoService.getTodos()
        patchState(store, {todos, loading: false})
      },
      async addTodo(title: string) {
        patchState(store, {loading: true})
        const todo = await todoService.addTodo({title, completed: false})
        patchState(store, (state)=> ({
          todos: [...state.todos, todo],
          loading: false
        } ))
      },
      async deleteTodo(id: string) {
        patchState(store, {loading: true})
        await todoService.deleteTodo(id)
        patchState(store,(state)=> ({todos:state.todos.filter(todo=> todo.id !== id), loading: false}))
      },
      async updateTodo(id: string, completed: boolean) {
        await todoService.updateTodo(id)
        patchState(store, (state)=>({todos: state.todos.map(todo=> todo.id === id ? ({...todo, completed}): todo)}))
      },
      updateFilter(filter: TodosFilter) {
        patchState(store, {filter})
      }
    })
  )
)
