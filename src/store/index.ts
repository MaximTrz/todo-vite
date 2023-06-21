import { createStore } from "vuex";
import { Todo } from "@/types/Todo";
import { Filter } from "@/types/Filter";

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
    filters: (state)=>state.filters,
    activeFilter: (state) => state.filters.find(filter => filter.active)?.name,
    filteredTodos: (state, getters)=>{
      switch (getters.activeFilter) {
        case "all":
          return getters.todos          
        case "active":{
          return state.todos.filter((todo)=>!todo.completed)
        }
        case "done": {
          return state.todos.filter((todo)=>todo.completed)
        }
        default:
          return getters.todos
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
