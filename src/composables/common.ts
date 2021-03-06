import {ref, onMounted, customRef} from 'vue';

export function useAutoFocus() {
  const focusEl = ref<null | HTMLElement>(null);
  onMounted(() => {
    if (focusEl.value) {
      focusEl.value.focus();
    }
  });
  return focusEl;
}

export function useDebouncedRef(value: string, delay = 200) {
  let timeout: number;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: string) {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}
