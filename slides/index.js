import { createApp, ref } from "vue";
import { Fachwerk } from "fachwerk";
import { parse as parseMarkdown } from "marked";
import { parse as parseSlides } from "@slidev/parser";
import { useStorage, onKeyStroke } from "@vueuse/core";

export async function createFachwerk(setup = {}) {
  const slides = await fetch("./slides.md").then((res) => res.text());

  const parsedSlides = parseSlides(slides).slides.map(
    (s, i) =>
      `<div
        class="
          prose md:prose-xl p-4 md:p-12 max-w-none min-h-screen 
          prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
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
  <div class="fixed top-0 right-2 flex text-xl">
    <button class="p-3 outline-none" @click="onPrev">&lsaquo;</button>
    <button class="p-3 outline-none" @click="onNext">&rsaquo;</button>
  </div>
  ${parsedSlides.join("\n\n")}
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
