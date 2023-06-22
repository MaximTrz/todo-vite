<template>
  <footer class="app-footer">
    еще {{ getCountOutstanding }} сделать, {{ getCountCompleted }} сделано
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  computed: {
    ...mapGetters(["getCountCompleted", "getCountOutstanding"]),
  },
});
</script>
