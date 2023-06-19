<template>
  <ul className="list-group todo-list">
    <li key="{id}" className="list-group-item">
      <TodoListItem />
    </li>
  </ul>
</template>

<style>
.todo-list .list-group-item {
  padding: 0.25rem 0.75rem;
}
</style>
