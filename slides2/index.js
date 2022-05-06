import {
  ref,
  h,
  computed,
  onMounted,
  watch,
  watchEffect,
  getCurrentInstance,
  nextTick,
} from "vue";
import { Fachwerk, data } from "fachwerk";
import { compileMarkdown, compileTemplate } from "fachwerk/internal";
import { parse } from "@slidev/parser";
import { useStorage, useMagicKeys } from "@vueuse/core";

export const Icon = {
  props: ["id"],
  setup(props) {
    const icon = ref("");
    const [collection, name] = props.id.split(":");
    fetch(`https://unpkg.com/@iconify/json/json/${collection}.json`)
      .then((res) => res.json())
      .then(({ icons }) => {
        icon.value = icons[name].body;
      });
    return { icon };
  },
  template: `<svg class="w-5 h-5 inline-block align-middle text-gray-900" viewBox="0 0 24 24" v-html="icon" />`,
};

const Compiler = {
  props: ["code", "setup"],
  setup(props) {
    const Output = computed(() => {
      return {
        setup() {
          return props.setup;
        },
        render: compileTemplate(compileMarkdown(props.code)).code,
      };
    });
    return () => h(Output.value);
  },
};

function parseSlides(code) {
  let global = {};
  try {
    return parse(code).slides.map((s) => {
      if (s.frontmatter?.data) {
        Object.entries(s.frontmatter.data).forEach(([key, value]) => {
          data[key] = value;
        });
      }
      if (s.frontmatter?.global) {
        global = { ...global, ...s.frontmatter.global };
      }
      s.frontmatter.global = global;
      s.content = compileMarkdown(s.content);
      return s;
    });
  } catch (e) {
    return [];
  }
}

export function useEditor() {
  const input = ref(null);
  onMounted(() => {
    input.value.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        input.value.setRangeText(
          Array.from({ length: 2 }).fill(" ").join(""),
          input.value.selectionStart,
          input.value.selectionStart,
          "end"
        );
      }
    });
  });
  return input;
}

export function useLoader(key, loader) {
  const saved = useStorage(key, "");
  const current = ref("");
  const save = () => (saved.value = current.value);
  const reset = () =>
    loader().then((original) => {
      saved.value = original;
      current.value = original;
    });
  loader().then((original) => {
    if (saved.value && original !== saved.value) {
      current.value = saved.value;
    } else {
      saved.value = original;
      current.value = original;
    }
  });
  return { current, saved, save, reset };
}

export function useSlides(key, content) {
  const slides = computed(() => parseSlides(content.value));
  const slideIndex = useStorage(key, 0);
  const next = () => {
    if (slideIndex.value < slides.value.length - 1) slideIndex.value++;
  };
  const prev = () => {
    if (slideIndex.value > 0) slideIndex.value--;
  };
  const { shift, left, right } = useMagicKeys();
  watchEffect(() => {
    if (left.value && shift.value) prev();
    if (right.value && shift.value) next();
  });
  return { slides, slideIndex, prev, next };
}

export const App = {
  components: { Compiler },
  setup() {
    const loader = () => fetch("./slides.md").then((res) => res.text());
    const { current, save, reset } = useLoader("slides_code", loader);
    watch(current, save);

    const editor = useEditor();

    const { slides, slideIndex, prev, next } = useSlides(
      "slides_index",
      current
    );

    const edit = useStorage("slides_edit", false);

    const app = getCurrentInstance().appContext.app;
    app.use(Fachwerk);
    app.component("Icon", Icon);
    app.config.globalProperties.prev = prev;
    app.config.globalProperties.next = next;

    return {
      editor,
      current,
      save,
      reset,
      slides,
      slideIndex,
      next,
      prev,
      edit,
    };
  },
  template: `
    <div class="grid h-screen grid-cols-1" :class="[edit ? 'grid-cols-[1fr_2fr]' : 'grid-cols-1']">
      <textarea
        ref="editor"
        v-show="edit"
        v-model="current"
        class="text-sm leading-6 text-gray-100 bg-gray-900 p-4 text-white font-mono border-none outline-none focus:outline-none"
      />
      <div>
        <template v-for="slide in slides">
          <div
            v-show="slide.index === slideIndex"
            class="prose max-w-none min-h-screen p-12"
            :class="[slide.frontmatter?.global.class,slide.frontmatter?.class]"
          >
            <Compiler :code="slide.content" />
          </div>
        </template>
      </div>
    </div>
    <div v-show="edit" class="fixed left-4 bottom-4 flex gap-4 text-xs text-white opacity-50">
      <button @click="reset">Reset</button>
    </div>
    <div class="fixed right-4 bottom-4 flex gap-4 text-xs text-black opacity-50">
      <button @click="edit = !edit">{{ edit ? 'Preview' : 'Edit'}}</button>
      <button @click="prev">‹</button>
      <button @click="next">›</button>
    </div>
  `,
};
