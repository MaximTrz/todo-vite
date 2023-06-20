<template>
  <app-header></app-header>

  <app-filters></app-filters>

  <main class="app-main">
    <app-todo-list></app-todo-list>
    <app-add-todo></app-add-todo>
  </main>
  <app-footer></app-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppFilters from "./components/AppFilters.vue";
import AppTodoList from "./components/AppTodoList.vue";
import AppAddTodo from "./components/AppAddTodo.vue";
import AppFooter from "./components/AppFooter.vue";

export default defineComponent({
  components: {
    AppHeader,
    AppFilters,
    AppTodoList,
    AppAddTodo,
    AppFooter,
  },
});
</script>
