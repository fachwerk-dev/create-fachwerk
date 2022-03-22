// Add your own variables

import { ref, computed } from "vue";

const customX = ref(0);
const customY = computed(() => customX.value * 10);
const customReset = () => (customX.value = 0);

export const setup = { customX, customY, customReset };

// Add your own components

import { f } from "fachwerk";

const CustomComponent = {
  setup() {
    return { f };
  },
  template: `
    <div class="opacity-50">I am CustomComponent and I can change {{ f.x }}</div>
    `,
};

export const components = { CustomComponent };
