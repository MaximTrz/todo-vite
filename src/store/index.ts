import { createStore } from "vuex";
import { Todo } from "@/types/Todo";
import { Filter } from "@/types/Filter";
import { FiltersNames } from "@/types/FiltersNames";
import ApiService from "../ApiService";

interface State {
  ai: number,
  todos: Todo[],
  filters: Filter[],
  apiService: ApiService
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
    ],

    apiService: new ApiService(),    
    
  },
  getters: {    
    filters: (state):Filter[]=>state.filters,
    activeFilter: (state): FiltersNames => {
      const activeFilter = state.filters.find(filter => filter.active);
      return activeFilter ? activeFilter.name : "all";
    },
    filteredTodos: (state, getters: { activeFilter: FiltersNames }):Todo[]=>{
      switch (getters.activeFilter) {
        case "all":
          return state.todos          
        case "active":{
          return state.todos.filter((todo)=>!todo.completed)
        }
        case "done": {
          return state.todos.filter((todo)=>todo.completed)
        }
        default:
          return state.todos
      }            
    },      
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
      for (let targetFilter of state.filters) {
        targetFilter.active = targetFilter === filter
      }
    },
    setTodos(state, todos: Object[]){

    }   
  },
  actions: {
    getAllTasks({state}){
      state.apiService.getAllTasks().then(result =>{
        //state.todos = JSON.parse(result.data);
      }) ;
    },
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
