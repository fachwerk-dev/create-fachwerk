import { createApp, ref } from "vue";
import { Fachwerk } from "fachwerk";
import { parse as parseMarkdown } from "marked";
import { parse as parseSlides } from "@slidev/parser";

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
        v-show="i === ${i}"
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
      const i = ref(0);
      const onNext = () => {
        if (i.value < parsedSlides.length - 1) i.value++;
      };
      const onPrev = () => {
        if (i.value > 0) i.value--;
      };
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
      });
      return { i, onNext, onPrev, ...setup };
    },
    template,
  };

  const app = createApp(App);
  app.use(Fachwerk);
  app.mount("#app");
}
