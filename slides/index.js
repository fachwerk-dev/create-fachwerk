import { createApp, ref } from "vue";
import { Fachwerk } from "fachwerk";
import { parse as parseMarkdown } from "marked";
import { parse as parseSlides } from "@slidev/parser";
import { useStorage, onKeyStroke } from "@vueuse/core";

export async function createFachwerk(setup = {}) {
  const slides = await fetch("./slides.md").then((res) => res.text());

  const parsedSlides = parseSlides(slides).slides;
  const slidesTemplate = parsedSlides.map(
    (s, i) =>
      `<div
        class="
          prose md:prose-xl p-4 md:p-12 max-w-none min-h-screen 
          prose-code:px-1
          prose-code:before:content-none prose-code:after:content-none
          prose-p:max-w-[70ch]
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
  <div class="fixed bottom-3 right-3 flex text-md bg-white rounded shadow">
    <button class="px-2 outline-none" @click="onPrev">&lsaquo;</button>
    <button class="px-2 outline-none" @click="onNext">&rsaquo;</button>
  </div>
  `;

  const App = {
    setup() {
      const slide = useStorage("fachwerk_slide", 0);
      const onNext = () => {
        if (slide.value < parsedSlides.length - 1) slide.value++;
      };
      const onPrev = () => {
        if (slide.value > 0) slide.value--;
      };
      onKeyStroke("ArrowLeft", onPrev);
      onKeyStroke("ArrowRight", onNext);
      return { slide, onNext, onPrev, ...setup };
    },
    template,
  };

  const app = createApp(App);
  app.use(Fachwerk);
  app.mount("#app");
}
