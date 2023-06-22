<template>
  <li
    class="todo-item"
    :class="{ 'todo-item--done': todo.completed }"
    @click="toggleTodo(todo)"
  >
    <div class="todo-item__status">
      <i class="bi bi-check2"></i>
    </div>
    <span class="todo-item__text"> {{ todo.text }} </span>
    <button class="todo-item__remove-button" @click.stop="deleteTodo(todo.id)">
      <i class="bi bi-trash3"></i>
    </button>
  </li>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Todo } from "@/types/Todo";
import { mapActions } from "vuex";

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  methods: {
    ...mapActions(["toggleTodo", "deleteTodo"]),
  },
});
</script>
