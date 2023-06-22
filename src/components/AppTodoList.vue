<template>
  <ul class="todo-list">
    <app-todo-item
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
    ></app-todo-item>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppTodoItem from "./AppTodoItem.vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  beforeMount() {
    this.getAllTasks();
  },
  components: { AppTodoItem },
  methods: {
    ...mapActions(["getAllTasks"]),
  },
  computed: {
    ...mapGetters(["filteredTodos"]),
  },
});
</script>
