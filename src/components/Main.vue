<template>
  <div class="todo-app">
    <AppHeader toDo="{todoCount}" done="{doneCount}" />
    <div className="top-panel d-flex">
      <SearchPanel />
      <ItemStatusFilter />
    </div>

    <TodoList
      todos="{todoData}"
      onToggleImportant="{this.onToggleImportant}"
      onToggleDone="{this.onToggleDone}"
    />

    <ItemAddForm onItemAdded="{this.addItem}" />
  </div>
</template>

<style>
.todo-app {
  margin: 2rem auto 0 auto;
  max-width: 400px;
}

.top-panel {
  margin: 1rem 0;
}
</style>
