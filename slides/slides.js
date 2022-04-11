import { ref, computed } from "vue";

const customX = ref(0);
const customY = computed(() => customX.value * 10);
const customReset = () => (customX.value = 0);

export const setup = { customX, customY, customReset };

const Info = {
  inheritAttrs: false,
  template: `
  <div class="grid grid-cols-[auto,1fr] gap-2">
    <Icon id="bx:info-circle" class="w-6 h-6 translate-y-1" />
    <div v-bind="$attrs" class="text-gray-500"><slot /></div>
  </div>`,
};

export const components = { Info };
