// Add your own reactive and computed variables
import { ref, computed } from "vue";

const x = ref(0);
const y = computed(() => x.value * 10);
const reset = () => (x.value = 0);

export { x, y, reset };
