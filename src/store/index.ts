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
    todos: [],
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
    pushTodo(state, todo: Todo){
      state.todos.push(todo);
    },
    removeTodo(state, id: number){
      state.todos = state.todos.filter((todo: Todo)=>todo.id !== id);
    },
    changeFilter(state, filter: Filter){      
      for (let targetFilter of state.filters) {
        targetFilter.active = targetFilter === filter
      }
    },
    setTodos(state, todos: Todo[]){
      let newTodos = [];
      for (let todo of todos){
        newTodos.push({id: todo.id, text: todo.text, completed: todo.completed == !!1})
      }
      state.todos = newTodos;
    }   
  },
  actions: {
    getAllTasks({state, commit}){
      
        state.apiService.getAllTasks().then(result =>{
          const todos = JSON.parse(result.data);
          commit("setTodos", todos);
        }).catch(error => {
          throw new Error("Не удалось загрузить данные с сервера");          
        });       

    },
    toggleTodo({commit}, id: number){
      commit("changeTodoStatus", id);              
    },
    addTodo({commit}, text: string){      
        this.state.apiService.addTask({text, completed: 0}).then(result => {
          if (result.result){
            commit("pushTodo", {id: parseInt(result.data), text: text, completed: false});
          }            
        }).catch(error => {
          throw new Error("Не удалось отправить данные на сервер");          
        });      
    },
    deleteTodo({state, commit}, id: number){      
      state.apiService.deleteTask(`task/${id}`).then(result => {
        if(result.result){
          commit("removeTodo", id);
        }
      }).catch(error => {
        throw new Error("Не удалось отправить данные на сервер");          
      });           
    },
  },
  modules: {},
});
