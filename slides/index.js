import { createApp, ref } from "vue";
import { Fachwerk } from "fachwerk";
import { parse as parseMarkdown } from "marked";
import { parse as parseSlides } from "@slidev/parser";
import { useStorage, onKeyStroke } from "@vueuse/core";

export async function createFachwerk(setup = {}) {
  const rawSlides = await fetch("./slides.md").then((res) => res.text());
  const slides = parseSlides(rawSlides).slides;

  const slidesTemplate = slides.map(
    (s, i) =>
      `<div
        class="
          prose md:prose-xl p-4 md:p-12 max-w-none min-h-screen 
          prose-code:px-1 prose-p:max-w-[70ch]
          prose-code:before:content-none prose-code:after:content-none
          ${s.frontmatter?.class}
        "
        style="${s.frontmatter?.style}"
        v-show="slide === ${i}"
      >
        ${parseMarkdown(s.content)}
      </div>`
  );

  const template = `
  ${slidesTemplate.join("\n\n")}
  <div v-show="menu" class="fixed top-0 left-0 bottom-0 w-[80vw] md:w-[20vw] p-6 bg-white shadow">
    <div class="overflow-auto leading-8">
      <div class="cursor-pointer text-gray-700 hover:text-gray-900" v-for="slide in slides.filter(s => s.frontmatter?.title)" @click="goto(slide.frontmatter.title); menu = false">
        {{ slide.frontmatter?.title }}
      </div>
    </div>
  </div>
  <div class="text-lg fixed left-3 bottom-3 flex text-md transition-opacity opacity-100 md:opacity-20 hover:md:opacity-100 bg-white md:bg-transparent rounded md:rounded-none shadow md:shadow-none">
    <button class="px-2 outline-none" @click="menu = !menu">≡</button>
    <button class="px-2 outline-none" @click="prev">‹</button>
    <button class="px-2 outline-none" @click="next">›</button>
    </div>
  <div class="text-lg fixed right-3 bottom-3 flex text-md transition-opacity opacity-100 md:opacity-20 hover:md:opacity-100 bg-white md:bg-transparent rounded md:rounded-none shadow md:shadow-none">

  </div>
  `;

  const App = {
    setup() {
      const menu = useStorage("fachwerk_menu", false);
      const slide = useStorage("fachwerk_slide", 0);
      const next = () => {
        if (slide.value < slides.length - 1) slide.value++;
      };
      const prev = () => {
        if (slide.value > 0) slide.value--;
      };
      const goto = (title) => {
        const index = slides.findIndex((s) => s.frontmatter?.title === title);
        if (index > -1) {
          slide.value = index;
        }
      };
      onKeyStroke("ArrowLeft", prev);
      onKeyStroke("ArrowRight", next);
      return { slides, menu, slide, next, prev, goto, ...setup };
    },
    template,
  };

  const app = createApp(App);
  app.use(Fachwerk);
  app.mount("#app");
}
