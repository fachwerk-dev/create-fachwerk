import {
  compile,
  computed,
  getCurrentInstance,
  h,
  onMounted,
  ref,
  watchEffect,
} from "vue";
import { Fachwerk, data } from "fachwerk/vue";
import { parse } from "@slidev/parser";
import { useStorage, useMagicKeys } from "@vueuse/core";
import { twMerge } from "tailwind-merge";
import MarkdownIt from "markdown-it";
import MarkdownItExternalLinks from "markdown-it-external-links";

export const Default = {
  props: ["frontmatter"],
  template: `
    <div class="relative">
      <div
        v-show="frontmatter?.image"
        class="absolute inset-0 bg-cover -z-10"
        :style="{backgroundImage: 'url(' + frontmatter?.image + ')'}"
      />
      <div class="h-screen p-[5vw]" :class="frontmatter.class">
        <slot />
      </div>
    </div>
  `,
};

export const Icon = {
  props: ["icon"],
  setup(props) {
    const icon = ref("");
    const icons = useStorage("slides_icons", {});
    const [collection, name] = props.icon.split(":");
    icon.value = icons.value?.[collection]?.[name];
    return { icon };
  },
  template: `<svg class="w-5 h-5 inline-block align-middle" viewBox="0 0 24 24" v-html="icon" />`,
};

function compileMarkdown(source) {
  const md = new MarkdownIt({ linkify: true, html: true, breaks: true }).use(
    MarkdownItExternalLinks,
    {
      externalClassName: null,
      externalTarget: "_blank",
    }
  );
  return md.render(source);
}

function compileTemplate(source) {
  const errors = [];
  let code = undefined;
  try {
    const compiledCode = compile(source, {
      onError: (err) => {
        errors.push(err);
      },
    });
    code = compiledCode || (() => null);
  } catch (e) {
    errors.push(e);
  }
  return { code, errors };
}

const Compiler = {
  props: ["code"],
  setup(props) {
    const Output = computed(() => {
      return {
        setup() {
          const app = getCurrentInstance().appContext.app;
          return { ...app.config.globalProperties };
        },
        render: compileTemplate(compileMarkdown(props.code)).code,
      };
    });
    return () => h(Output.value);
  },
};

export const Info = {
  inheritAttrs: false,
  props: { icon: { default: "bx:info-circle" } },
  template: `
  <div class="flex gap-2 md:gap-3">
    <Icon :icon="icon" class=" md:w-6 md:h-6 xl:w-8 xl:h-8 text-gray-400 shrink-0" v-bind="$attrs" />
    <div class="text-gray-400 -mt-1"><slot /></div>
  </div>
  `,
};

const proseClasses = `
  max-w-none
  prose
  prose:body:text-gray-800
  md:prose-lg
  xl:prose-2xl
  prose-p:max-w-[70ch]
  md:prose-h1:text-6xl
  md:prose-h1:tracking-tight
  prose-pre:bg-gray-800
  prose-code:bg-gray-100
  prose-code:before:content-none
  prose-code:after:content-none
  prose-code:px-2
  prose-code:py-1
  prose-code:rounded
  prose-p:before:content-none
  prose-p:after:content-none
  prose-blockquote:border-l-4
  prose-blockquote:border-yellow-400
  prose-blockquote:pl-6
  prose-blockquote:font-normal
  prose-blockquote:not-italic
  prose-blockquote:text-gray-600
  2xl:prose-p:text-3xl
  2xl:prose-p:leading-relaxed
  2xl:prose-p:my-[2.5vw]
  2xl:prose-h1:text-8xl
  2xl:prose-h2:text-6xl
  2xl:prose-h3:text-4xl
  2xl:prose-h4:text-3xl
  2xl:prose-h5:text-2xl
  2xl:prose-code:text-2xl
  2xl:prose-code:leading-[2.5em]
  2xl:prose-pre:p-[2.5vw]
  2xl:prose-pre:max-w-[120ch]
  2xl:prose-li:text-3xl
`;

function parseSlides(code) {
  let global = {};
  try {
    const parsedSlides = parse(code).slides;
    parsedSlides.forEach((s) => {
      if (s.frontmatter?.global) {
        global = { ...global, ...s.frontmatter.global };
      }
    });
    return parsedSlides.map((s) => {
      if (s.frontmatter?.data) {
        Object.entries(s.frontmatter.data).forEach(([key, value]) => {
          data[key] = value;
        });
      }
      s.frontmatter.global = global;
      s.frontmatter.class = twMerge(
        [
          proseClasses,
          s.frontmatter.class || "",
          s.frontmatter.global?.class || "",
        ].join(" ")
      );
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
      saved.value = "";
      current.value = original;
    });
  loader().then((original) => {
    if (saved.value && original !== saved.value) {
      current.value = saved.value;
    } else {
      current.value = original;
    }
  });
  return { current, saved, save, reset };
}

export function useSlides(key, content) {
  const slides = computed(() => parseSlides(content.value));
  const slideIndex = useStorage(key, 0);
  watchEffect(() => {
    if (slides.value.length > 1 && slideIndex.value > slides.value.length - 1) {
      slideIndex.value = slides.value.length - 1;
    }
  });
  const next = () => {
    if (slideIndex.value < slides.value.length - 1) {
      slideIndex.value++;
    }
  };
  const prev = () => {
    if (slideIndex.value > 0) {
      slideIndex.value--;
    }
  };
  const go = (title) => {
    const index = slides.value.findIndex((s) => s.frontmatter?.title === title);
    if (index > -1) {
      slideIndex.value = index;
    }
  };
  const { shift, left, right } = useMagicKeys();
  watchEffect(() => {
    if (left.value && shift.value) prev();
    if (right.value && shift.value) next();
  });
  return { slides, slideIndex, prev, next, go };
}

function useIcons(key, collections) {
  const icons = useStorage(key, {});

  const getIcons = (icons) =>
    Object.fromEntries(
      Object.entries(icons).map(([key, { body }]) => [key, body])
    );

  Promise.all(
    collections.map((collection) =>
      fetch(`https://unpkg.com/@iconify/json/json/${collection}.json`).then(
        (res) => res.json()
      )
    )
  ).then((fetchedCollections) => {
    icons.value = Object.fromEntries(
      collections.map((collection, i) => [
        collection,
        getIcons(fetchedCollections[i].icons),
      ])
    );
  });
}

export const App = {
  components: { Compiler, Icon },
  setup() {
    const app = getCurrentInstance().appContext.app;

    const loader =
      app.config.globalProperties.loader ||
      (() => fetch("./slides.md").then((res) => res.text()));

    const { current, save, reset } = useLoader("slides_code", loader);

    const editor = useEditor();

    const { slides, slideIndex, prev, next, go } = useSlides(
      "slides_index",
      current
    );

    const edit = useStorage("slides_edit", false);
    const menu = ref(false);

    const collections = app.config.globalProperties.icons || ["bx"];
    useIcons("slides_icons", collections);

    app.use(Fachwerk);
    app.component("Icon", Icon);
    app.component("Info", Info);
    app.component("Default", Default);

    app.config.globalProperties = {
      ...app.config.globalProperties,
      prev,
      next,
      go,
    };

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
      menu,
    };
  },
  template: `
    <div class="grid grid-cols-1" :class="[edit ? 'md:grid-cols-[1fr_minmax(0,2fr)]' : '']">
      <div v-show="edit" class="relative h-screen sticky top-0">
      <textarea
        ref="editor"
        v-model="current"
        class="w-full h-full leading-6 !text-gray-300 bg-gray-900 p-4 text-white font-mono border-none outline-none focus:outline-none"
      />
        <div v-show="edit" class="absolute left-0 bottom-0 right-0 flex justify-end gap-4 text-sm pb-3 pt-6 px-4 bg-gradient-to-t via-gray-900/80 from-gray-900">
          <div class="px-2 py-1 text-white/25 cursor-pointer" @click="reset">Reset</div>
          <div class="px-2 py-1 bg-amber-500 text-white cursor-pointer rounded" @click="save">Save</div>
        </div>
      </div>
      <div>
        <div v-for="slide in slides">
          <component
            :is="slide.frontmatter.layout || 'Default'"
            :frontmatter="slide.frontmatter"
            v-show="slide.index === slideIndex"
          >
            <Compiler :code="slide.content" />
          </component>
        </div>
      </div>
    </div>
    <div class="fixed bottom-3 left-3">
      <Icon
        icon="bx:pencil"
        class="cursor-pointer "
        :class="[edit ? 'text-amber-500': 'text-black/25']"
        @click="edit = !edit"
      />
    </icon>
    <div v-if="menu" class="not-prose fixed top-0 right-0 bottom-0 w-[80vw] md:w-[25vw] p-6 bg-white shadow">
      <div class="overflow-auto leading-8">
        <div
          v-for="slide in slides.filter(s => s.frontmatter?.title)"
          @click="go(slide.frontmatter.title); menu = false"
          class="cursor-pointer text-gray-700 hover:text-gray-900"
        >
          {{ slide.frontmatter?.title }}
        </div>
      </div>
    </div>
    <div class="fixed right-3 bottom-3 pt-1 px-2 flex text-md bg-white md:bg-transparent rounded md:rounded-none shadow md:shadow-none">
      <Icon icon="bx:menu" @click="menu = !menu" class="cursor-pointer" :class="[menu ? 'text-amber-500 hover:text-amber-600' : 'text-black/25 hover:text-black/50']" />
      &ensp;
      <Icon icon="bx:left-arrow-alt" class="cursor-pointer text-black/25 hover:text-black/50" @click="prev" />
      <Icon icon="bx:right-arrow-alt" class="cursor-pointer text-black/25 hover:text-black/50" @click="next" />
    </div>
  `,
};
