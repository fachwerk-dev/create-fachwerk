import { ref, h, computed, onMounted, watchEffect } from "vue";
import { data } from "fachwerk";
import { compileMarkdown, compileTemplate } from "fachwerk/internal";
import { parse } from "@slidev/parser";
import { useStorage, useMagicKeys } from "@vueuse/core";

export const Compiler = {
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
