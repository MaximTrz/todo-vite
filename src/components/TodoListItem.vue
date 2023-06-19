<template>
  <span class="todo-list-item">
    <span class="todo-list-item-label"> {label} </span>

    <button type="button" class="btn btn-outline-success btn-sm float-right">
      <i class="fa fa-exclamation" />
    </button>

    <button type="button" class="btn btn-outline-danger btn-sm float-right">
      <i class="fa fa-trash-o" />
    </button>
  </span>
</template>

<style>
.todo-list-item {
  font-size: 1.25rem;
}

.todo-list-item button {
  width: 35px;
  margin: 3px;
}

.todo-list-item-label {
  margin-left: 1.25rem;
  line-height: 35px;
  cursor: pointer;
  user-select: none;
}

.todo-list-item.done .todo-list-item-label {
  text-decoration: line-through;
}

.todo-list-item.important .todo-list-item-label {
  font-weight: bold;
  color: steelblue;
}
</style>
