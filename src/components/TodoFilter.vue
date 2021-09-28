<template>
  <div class="filters">
    <span
      v-for="filter in filters"
      :key="filter.value"
      class="filter"
      :class="{active: selected == filter.value}"
      @click="$emit('change-filter', filter.value)"
    >
      {{ filter.label }}
    </span>
  </div>
</template>

<script lang="ts">
import {reactive, defineComponent} from 'vue';
import {filter} from '@/types';

export default defineComponent({
  name: 'TodoFilter',
  props: {
    selected: String,
  },
  emits: ['change-filter'],
  setup() {
    const filters = reactive<filter[]>([
      {label: '全部', value: 'all'},
      {label: '已完成', value: 'done'},
      {label: '未完成', value: 'todo'},
    ]);
    return {filters};
  },
});
</script>

<style>
.filters {
  display: flex;
  margin: 24px 2px;
  color: #c0c2ce;
  font-size: 14px;
  cursor: pointer;
}

.filters .filter {
  margin-right: 14px;
  transition: 0.8s;
}

.filters .filter.active {
  color: #6b729c;
  transform: scale(1.2);
}
</style>
