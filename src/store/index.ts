import { createStore } from "vuex";
import { Todo } from "@/types/Todo";
import { FilterNames } from "@/types/Filters";

interface State {
  ai: number,
  todos: Todo[],
  filters: {
    [key in FilterNames]: boolean
  }
}

export default createStore <State> ({
  state: {
    ai: 0,
    todos: [
      { id: 0, text: "test", completed: true },
      { id: 1, text: "test", completed: false },
      { id: 2, text: "test", completed: false },
    ],
    filters: {
      all: true,
      active: false,
      done: false,
    }
    
  },
  getters: {
    todos: (state) => state.todos,
    activeTodos: (state) => state.todos.filter((todo)=>!todo.completed),
    doneTodos: (state)=>state.todos.filter((todo)=>todo.completed),
    filterAll: (state) => state.filters.all,
    filterActive: (state) => state.filters.active,
    filterDone: (state) => state.filters.done,         
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
    changeFilter(state, FilterNames: FilterNames){
      Object.keys(state.filters).forEach(function(filterKey) {
        //state.filters[FilterNames] = (filterKey === key);
      });
      // function toggleFilter(key) {
      //   Object.keys(filters).forEach(function(filterKey) {
      //     filters[filterKey] = (filterKey === key);
      //   });
      //}     
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
