import { createStore } from "vuex";
import { Todo } from "@/types/Todo";
import { Filter } from "@/types/Filter";
import AppTodoListVue from "@/components/AppTodoList.vue";

interface State {
  ai: number,
  todos: Todo[],
  filters: Filter[]
}

export default createStore <State> ({
  state: {
    ai: 3,
    todos: [
      { id: 0, text: "test", completed: true },
      { id: 1, text: "test", completed: false },
      { id: 2, text: "test", completed: false },
    ],
    filters: [
      {name: "all", label: "Все", active: true},
      {name: "active", label: "Активные", active: false},
      {name: "done", label: "Завершенные", active: false},
    ]
    
    
  },
  getters: {
    todos: (state) => state.todos,
    activeTodos: (state) => state.todos.filter((todo)=>!todo.completed),
    doneTodos: (state)=>state.todos.filter((todo)=>todo.completed),
    filters: (state)=>state.filters      
  },
  mutations: {
    changeTodoStatus(state, id: number){
      const targetTodo = state.todos.find((todo)=>todo.id === id);
      if (targetTodo){
        targetTodo.completed = !targetTodo.completed;
      }
    },
    pushTodo(state, text: string){
      state.todos.push({id: state.ai++, text: text, completed: false});
    },
    removeTodo(state, id: number){
      state.todos = state.todos.filter((todo: Todo)=>todo.id !== id);
    },
    changeFilter(state, filter: Filter){
      // const filterKeys = Object.keys(state.filters) as Array<keyof typeof FilterNames>;
      // for (let name of filterKeys) {
      //   state.filters[name] = filtername == name;
      // }
    }   
  },
  actions: {
    toggleTodo({commit}, id: number){
      commit("changeTodoStatus", id);              
    },
    addTodo({commit}, text: string){
      commit("pushTodo", text);
    },
    deleteTodo({commit}, id: number){
      commit("removeTodo", id);
    },
  },
  modules: {},
});
