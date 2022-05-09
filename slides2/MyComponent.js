export const MyComponent = {
  inheritAttrs: false,
  props: { icon: { default: "bx:info-circle" } },
  template: `
  <div class="flex gap-2 md:gap-3">
    <Icon :id="icon" class="text-gray-500" v-bind="$attrs" />
    <div class="text-gray-500 -mt-1"><slot /></div>
  </div>
  `,
};
