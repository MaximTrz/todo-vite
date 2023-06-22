<template>
  <section class="add-todo">
    <form v-if="isFormVisible" class="add-todo__form">
      <button class="close-button" type="button" @click="toggleFormVisible">
        <i class="bi bi-x"></i>
      </button>
      <div class="text-input text-input--focus">
        <input class="input" v-model="text" />
      </div>
      <button class="button button--filled" @click.prevent="addTodo">
        Добавить задачу
      </button>
    </form>
    <button
      v-else
      class="add-todo__show-form-button"
      @click="toggleFormVisible"
    >
      <i class="bi bi-plus-lg"></i>
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

interface State {
  isFormVisible: boolean;
  text: string;
}

export default defineComponent({
  data: function (): State {
    return {
      isFormVisible: false,
      text: "",
    };
  },
  methods: {
    ...mapActions({ addTodoAction: "addTodo" }),
    addTodo() {
      if (this.text.trim().length === 0) {
        return;
      }
      this.addTodoAction(this.text);
      this.text = "";
    },
    toggleFormVisible() {
      this.isFormVisible = !this.isFormVisible;
    },
  },
});
</script>
