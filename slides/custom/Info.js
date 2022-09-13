const Info = {
  inheritAttrs: false,
  props: { icon: { default: "bx:info-circle" } },
  template: `
    <div class="flex gap-2 md:gap-3">
      <Icon v-bind="$attrs" :icon="icon" class=" md:w-6 md:h-6 xl:w-8 xl:h-8 text-gray-400 shrink-0"  />
      <div class="text-gray-400 -mt-1"><slot /></div>
    </div>
    `,
};

export default Info;
