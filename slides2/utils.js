import { ref, computed } from "vue";
export const myX = ref(100);
export const myY = computed(() => myX.value * 10);
export const myReset = () => {
  myX.value = 0;
};
