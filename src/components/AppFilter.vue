<template>
  <button class="button" :class="classes">{{ filter.label }}</button>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Filter } from "@/types/Filter";

export default defineComponent({
  props: {
    filter: {
      type: Object as PropType<Filter>,
      required: true,
    },
  },
  computed: {
    classes: function () {
      return {
        "button--primary": this.filter.active,
      };
    },
  },
});
</script>
