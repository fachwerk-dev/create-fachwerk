import { ref, computed } from "vue";

export const fahrenheit = ref(-460);
export const celsius = computed(() =>
  Math.floor((5 / 9) * (fahrenheit.value - 32))
);
export const resetFahrenheit = () => {
  fahrenheit.value = -460;
};
