---
title: Frontpage
class: center gap-8 bg-[lightblue]
---

<div class="text-6xl md:text-8xl text-gray-800">▦</div>

# Fachwerk Slides

Press `Shift` and <code>&larr; &rarr;</code> to navigate

---
title: Get started
---

## About

Fachwerk Slides is an experimental distribution of the Fachwerk library. It combines [Fachwerk](https://fachwerk.dev/) components and utilities, [Tailwind Play CDN](https://tailwindcss.com/docs/installation/play-cdn) styling and [Slidev presentation format](https://sli.dev/guide/syntax.html) (based on Markdown). All this is packaged just into an HTML, JS, CSS, and MD file, and no build tools are needed for slide authoring.

## Get started

Run the following command and then choose `Slides` as a template:

```
npm init fachwerk@latest
```

You can re-run this command for updating the library, and it does not touch your work.

---
class: center gap-8 bg-[lightblue]
---

<Icon icon="bx:slideshow" class="w-24 h-24 text-gray-900" />

# Create slides

---
title: Create slides
---

## Create slides

Start editing `slides.md` file or press <Icon icon="bx:pencil" v-on:click="edit = true" /> button.

To separate slides, use `---` as a separator:

```
# Frontpage

---

# About
```

---

## Slide frontmatter and title

Slides can also have **frontmatter**, a header section with various metadata. It is stored in [YAML](https://dev.to/paulasantamaria/introduction-to-yaml-125f) format.

When adding `title:` metadata to pages, these pages appear in the menu. Click <Icon icon="bx:menu" /> to toggle it.

```
---
title: Frontpage
---

# Frontpage

---
title: About
---

# About
```

---
class: center bg-[lightblue]
---

<Icon icon="bx:right-arrow-circle" class="w-24 h-24 text-gray-900" />

<br />

# Add navigation

---
title: Add navigation
---

## Add navigation buttons

You can provide on-page buttons to jump to a specific page.

There are `prev()` and `next()` functions to jump to previous or next page:

```
<button v-on:click="next()" next slide <Icon icon="bx:right-arrow-alt" /></button>
```

<button v-on:click="next()">Goto next slide <Icon icon="bx:right-arrow-alt" /></button>

---

## Go to any page

You can also jump to a page with a specific `title:` using `go()` function:

```
---
title: Frontpage
---

# Frontpage

---

...in a later slide...

<button v-on:click="go('Frontpage')"><Icon icon="bx:arrow-to-left" /> Go to frontpage</button>
```

<button v-on:click="go('Frontpage')"><Icon icon="bx:arrow-to-left" /> Go to frontpage</button>

---
class: center bg-[lightblue]
---

<Icon icon="bx:cloud" class="w-24 h-24 text-gray-900" />

<br />

# Use icons

---
title: Use icons
---

## Use icons

Fachwerk support using custom icons powered by [Icônes](https://icones.js.org).

1. First, pick an icon from a collection. We prefer [Boxicons](https://icones.js.org/collection/bx), but you can choose any collection.

2. Then click on an icon and take note of the ID of the icon, such as `bx:cloud`.

3. Finally, use the following markup in the slide:

```
<Icon icon="bx:cloud" />
```

<Icon icon="bx:cloud" />

When using icons from another collection, say [Radix Icons](https://icones.js.org/collection/radix-icons) add it to the icons config in `index.html`:

```
app.config.globalProperties.icons = ["bx","radix-icons"]
```
---

## Customize icons

To customize the icon, use Tailwind classes.

Nothe that you need to specify both width and height: `h-24 w-24`

```
<Icon icon="bx:cloud" class="w-24 h-24 text-gray-400 hover:scale-150 transition" />
<Icon icon="bx:cloud-snow" class="w-24 h-24 text-gray-600 hover:scale-150 transition" />
<Icon icon="bx:cloud-lightning" class="w-24 h-24 text-gray-800 hover:scale-150 transition" />
```

<Icon icon="bx:cloud" class="w-24 h-24 text-gray-400 hover:scale-150 transition" />
<Icon icon="bx:cloud-snow" class="w-24 h-24 text-gray-600 hover:scale-150 transition" />
<Icon icon="bx:cloud-lightning" class="w-24 h-24 text-gray-800 hover:scale-150 transition" />

---
class: center bg-[lightblue]
---

<Icon icon="bx:paint-roll" class="w-24 h-24 text-gray-900" />

<br />

# Style slides

---
title: Style slides
class: bg-yellow-300
---

## Add background color

To style the _current_ slide, add `class:` to the frontmatter. Here's how to make the background yellow using [Tailwind color classes](https://tailwindcss.com/docs/background-color#setting-the-background-colors):

```
---
class: bg-yellow-300
---
```

To style _all_ slides, add a `global: class:` to the frontmatter:

```
---
global:
  class: bg-amber-200
---
```

---
class: bg-gradient-to-t from-blue-500 to-cyan-500
---

## Add two-stop gradient

In addition to single-coloured background you can also use [gradients](https://tailwindcss.com/docs/gradient-color-stops):

```
---
class: bg-gradient-to-t from-blue-500 to-cyan-500
---
```

---
class: bg-gradient-to-t from-pink-700 via-purple-700 to-indigo-700 prose-invert
---

## Add three-stop gradient

For extra flexibility, there are also [three-stop gradient](https://tailwindcss.com/docs/gradient-color-stops#middle-color):

```
---
class: bg-gradient-to-t from-pink-700 via-purple-700 to-indigo-700 prose-invert
---
```

See [hypercolor.dev](https://hypercolor.dev) for more inspiraton.

---
class: bg-gray-800 prose-invert
---

## Go dark

To style the slide with a dark background, add a darker version of the color with `bg-gray-800`, `bg-gray-900` etc.

To invert the text color, use the `prose-invert` class.

```yaml
---
class: dark:bg-gray-800 prose-invert
---
```

To make all the slides dark when the user is in dark mode, use the following global class:

```yaml
---
global:
  class: dark:bg-gray-800 dark:prose-invert
---
```

---
class: center bg-[lightblue]
---

<Icon icon="bx:image-alt" class="w-24 h-24 text-gray-900" />

<br />

# Add images

---
title: Add images
image: https://designstem.github.io/fachwerk/images/example.jpg
class: bg-black/25 prose-invert
---

## Add image background

To add a background image to an entire slide, use the `image:` in the frontmatter. When using longer texts on the slide, it is recommended invert the text color and add the dark overlay over the background for legibility:

To add a background image to an entire slide, use the `image:` in the frontmatter. When using longer texts on the slide, it is recommended invert the text color and add the dark overlay over the background for legibility:

```
---
image: https://designstem.github.io/fachwerk/images/example.jpg
class: bg-black/25 prose-invert
---
```

---
image: https://designstem.github.io/fachwerk/images/example.jpg
class: backdrop-brightness-50 backdrop-blur-3xl backdrop-saturate-200 prose-invert 
---

## Add backdrop filters

Instead of overlay, you can also use [backdrop filters](https://tailwindcss.com/docs/backdrop-blur) to decrease a background brightness and add the whole suite of effects while at it.

```
---
image: https://designstem.github.io/fachwerk/images/example.jpg
class: backdrop-brightness-50 backdrop-blur-3xl backdrop-saturate-200 prose-invert 
---
```

---
class: center bg-[lightblue]
---

<Icon icon="bx:layout" class="w-24 h-24 text-gray-900" />

<br />

# Work with layouts

---
title: Work with layouts
---

## Center the content

To center the content, use CSS Grid centering:

```yaml
---
class: grid place-content-center place-items-center text-center
---
```

---
class: grid place-content-center place-items-center text-center
---

# Hey, I am centered!

And I am too

---

## Add custom classes

Adding numerous classes to each slide can be repetitive. To overcome this, add custom CSS classes to `index.html` and re-use them in any slide.

Here is a custom `.center` class that centers elements on the slide:

```
.center {
    @apply grid place-content-center place-items-center text-center;
}
```

Here is how to use it in frontmatter:

```
---
class: center
---
```

---
class: center bg-[lightblue]
---

<Icon icon="bx:math" class="w-24 h-24 text-gray-900" />

<br />

# Add or subtract math

---
title: Add or subtract math
class: center bg-gray-900 prose-invert
---

## Here is some math

<f-math>\begin{pmatrix} a & c & e \\\\ b & d & f \\\\ 0 & 0 & 1 \end{pmatrix}</f-math>

See more at https://fachwerk.dev/components/f-math

---
class: center bg-[lightblue]
---

<Icon icon="bx:slider-alt" class="w-24 h-24 text-gray-900" />

<br />

# Work with data

---
title: Work with data
data:
names:
  - Romy Schneider
  - Klaus Kinski
---

## Define data

Sometimes it is helpful to separate the markup and the data. For example, you can define the data in the frontmatter:

```
---
data:
  names:
    - Romy Schneider
    - Klaus Kinski
---
```

You can access the data with `data.names`:

```
❴❴ data.names ❵❵
```

---
data:
  names:
    - Romy Schneider
    - Klaus Kinski
---

## Display data

It is more useful to loop over the data to display it:

```
<div class="grid gap-4">
  <div
    v-for="name in data.names"
    class="p-4 bg-blue-500 rounded"
  >
    ❴❴ name ❵❵
  </div>
</div>
```

<div class="flex gap-4">
  <div
    v-for="name in data.names"
    class="px-8 py-4 bg-blue-500 text-white rounded-full"
  >
    {{ name }}
  </div>
</div>

---
data:
  x: 50
---

## Make data reactive

The data does not have to be static. It can also be dynamically modified or _reactive_.

Lets set a variable `data.x` and control it with a slider:

```
---
data:
  x: 50
---
```

<pre v-pre>
&lt;input type="range" v-model.number="data.x" />  {{ data.x }}
</pre>

<input type="range" v-model.number="data.x" /> {{ data.x }}

<Info>When the variable's default value is 0, you can skip the frontmatter definition</Info>

---
class: center bg-[lightblue]
---

<Icon icon="bx:cog" class="w-24 h-24 text-gray-900" />

<br />

# Add custom code

---
title: Add custom code
---

## Create custom data

When you need to do more complex data manipulation, you can define custom variables and functions in Javascript.

Create a JS file, for example `data.js` and add your code there:

```js
import { ref, computed } from "vue";
export const fahrenheit = ref(-460);
export const celsius = computed(() =>
  Math.floor((5 / 9) * (fahrenheit.value - 32))
);
export const resetFahrenheit = () => {
  fahrenheit.value = -460;
};
```

---

## Register custom data

Next, you need to import and register custom data in index.html:

```js
import * as data from './data.js
app.config.globalProperties = {...app.config.globalProperties, ...data}
```

---

## Use custom data

Here's how to use the custom data in Markdown:

```
<input type="range" v-model="fahrenheit" min="32" max="1000">

Fahrenheit: ❴❴ fahrenheit ❵❵
Celsius: ❴❴ celsius ❵❵

<button v-on:click="resetFahrenheit">Reset</button>
```

<input type="range" v-model="fahrenheit" min="-460" max="1000">

Fahrenheit: {{ fahrenheit }}
Celsius: {{ celsius }}

<a v-on:click="resetFahrenheit">Reset</a>

---

## Create component

You can define custom components Javascript. For example, here is a `Info.js` component, similar to Vitepress [containers](https://vitepress.vuejs.org/guide/markdown.html#custom-containers):

```js
export const Info = {
  inheritAttrs: false,
  props: { icon: { default: "bx:info-circle" } },
  template: `
  <div class="flex gap-2 md:gap-3">
    <Icon :icon="icon" class="text-gray-500 shrink-0" v-bind="$attrs" />
    <div class="text-gray-500 -mt-1"><slot /></div>
  </div>
  `,
};
```

---

## Register component

Next, you need to import and register the component in `index.html`:

```js
import { Info } from "./Info.js";
app.component("Info", Info);
```

---

## Use component

Here's how to use the `Info` component in Markdown:

```md
<Info>Here is the default info box</Info>

<Info icon="bx:train" class="text-red-500">Kraftwerk are a German...</Info>
```

<Info>Here is the default info box</Info>

<Info icon="bx:train" class="text-red-500">Kraftwerk are a German band formed in Düsseldorf in 1969 by Ralf Hütter and Florian Schneider. Widely considered innovators and pioneers of electronic music, Kraftwerk were among the first successful acts to popularize the genre.</Info>

---

## Customize type

Fachwerk Slides uses [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) for serifs and [Cousine](https://fonts.google.com/specimen/Cousine) for monospaced type, but you can use any font available in Google Fonts.

Here's how to change the default fonts to [Inter](https://fonts.google.com/specimen/Inter) and [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) in `index.html`:

```
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto+Mono&display=swap"
  rel="stylesheet"
/>
<script>
  tailwind.config = {
    theme: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
    },
  };
</script>
```

---

## Customize loader

By default, Fachwerk Slides loads the slides data using `fetch()` from `./slides.md`. However, you can override the global loader function in `index.html` to fetch the Markdown files from anywhere.

Here is an example of loading two Markdown files, `slides1.md` and `slides2.md`, and merging them:

```js
const files = ["slides1.md", "slides2.md"];

app.config.globalProperties.loader = Promise.all(
  files.map((file) => fetch(file).then((res) => res.text()))
).then((files) => files.join(""));
```

---
title: Backpage
class: center bg-[lightblue]
---

<f-svg centered>
  <path
    :d="circlepoints(16,50)
      .map(point => circlepath(50,point))
      .join(' ')
    "
    fill="none"
    stroke="black"
    stroke-width="2"
  />
</f-svg>

See the [source in Github](https://github.com/fachwerk-dev/create-fachwerk/tree/main/slides)<br />More info at [fachwerk.dev](https://fachwerk.dev/)
