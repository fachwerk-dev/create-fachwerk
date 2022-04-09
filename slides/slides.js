// Customize fonts

export const fonts =
  "https://fonts.googleapis.com/css2?family=Cousine&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap";

// Customize theme

export const tailwind = {
  theme: {
    fontFamily: {
      sans: ["IBM Plex Sans", "sans-serif"],
      mono: ["Cousine", "monospace"],
    },
  },
};

// Add your own variables

import { ref, computed } from "vue";

const customX = ref(0);
const customY = computed(() => customX.value * 10);
const customReset = () => (customX.value = 0);

export const setup = { customX, customY, customReset };

// Add your own components

import { data } from "fachwerk";

const CustomComponent = {
  setup() {
    return { data };
  },
  template: `
    <div class="opacity-50">I am CustomComponent and data.x is {{ data.x }}</div>
    `,
};

export const components = { CustomComponent };
