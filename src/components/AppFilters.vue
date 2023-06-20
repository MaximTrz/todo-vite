<template>
  <aside class="app-filters">
    <section class="toggle-group">
      <AppFilter
        v-for="filter in filters"
        :filter="filter"
        :key="filter.name"
      ></AppFilter>
    </section>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import AppFilter from "./AppFilter.vue";
export default defineComponent({
  methods: {
    ...mapMutations(["changeFilter"]),
  },
  components: {
    AppFilter,
  },
  computed: {
    ...mapGetters(["filters"]),
  },
});
</script>
