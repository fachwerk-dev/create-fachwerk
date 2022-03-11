---
title: Frontpage
class: bg-lightblue-500 grid place-content-center place-items-center text-center
# global:
#   class: bg-lightblue-300 md:text-2xl
---

# ▦ Fachwerk Slides

Press `‹` `›` to navigate

---
title: About
---

## About

Fachwerk Slides is an experimental distribution of Fachwerk library. It combines [Fachwerk](https://fachwerk.dev/) components and utilities, [Tailwind Play CDN](https://tailwindcss.com/docs/installation/play-cdn) styling and [Slidev presentation format](https://sli.dev/guide/syntax.html) (based on Markdown). All this is packaged just into a HTML, JS and MD file and no build tools are needed for slide authoring.

## Getting started

Run the following command and then choose `Slides (experimental)` as a template:

```
npm init fachwerk
```

 You can re-run this command for updating the library, it does not touch your work.

---
title: Editing and metadata
---

## Slide setup 

Start with `slides.md` file. 

To separate slides, use `---` as a separator:

```md
# Frontpage

---

# About

```

---

## Slide metadata and menus

Slides can also have metadata or _frontmatter_. It is stored in YAML format.

When adding `title:` metadata to pages, these pages show up in the menu. Click <span v-on:click="menu = true" class="cursor-pointer">≡</span> to toggle it.

```md
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
title: Navigation
---

## Navigation

By default slide navigation is linear and can be controlled with `‹` `›` buttons on screen or keyboard.

However, you can set non-linear navigation by providing buttons of jump to a specific page. You can use `prev()` and `next()` functions to jump between pages:

```
<button v-on:click="next()">Goto next slide ›</button>
```

<button v-on:click="next()">Goto next slide ›</button>

---

## Navigation

You can also jump to a page with a specfic title using `goto()` function:

<button v-on:click="goto('Styling')">Goto "Styling" page ›</button>

Yes, it is also a next page.


---
title: Styling
class: bg-yellow-500
---

## Styling slides

#### Local styles

To style the the _current_ slide, add `class:` to the metadata with Tailwind classes.

Here's how to make the background yellow using [color classes](https://tailwindcss.com/docs/background-color):


```
---
class: bg-yellow-500
---
```

---
class: bg-amber-500
---

## Styling slides

#### Global styles

To style the the _all_ slides, add a `global:` section to the metadata.

Here's how to make background amber for all slides. 

```
---
global:
  class: bg-amber-500
---
```

It is recommended to add this to the first slide, otherwise subsequent global metadata will override the previous data.

---
class: bg-gray-900 prose-invert
---

## Dark theme

To style the slide with dark background it is recommended to invert also the text colors with `prose-invert` class. See more at Tailwind [typography plugin](https://tailwindcss.com/docs/typography-plugin).

```yaml
---
class: bg-gray-900 prose-invert
---
```

---
title: Layout
---

## Centering

To center the content, use CSS Grid centering:

```yaml
---
class: grid place-content-center place-items-center	
---
```

---
class: grid place-content-center place-items-center	text-center
---

# Hey I am centered!

And I am too

---
title: Images
class: prose-invert bg-cover bg-[url(https://designstem.github.io/fachwerk/images/example.jpg)]
---

## Background images

To add a background image, use the following in the metadata:

```
---
class: prose-invert bg-cover bg-[url(https://your-image-here.jpg)]
---
```


---
class: p-0 md:p-0 grid grid-cols-1 md:grid-cols-2
---

<div class="p-4 md:p-12">

## Image layouts

Here's how to create a responsive layout with an image:

```
---
class: p-0 md:p-0 grid grid-cols-1 md:grid-cols-2
---
<div class="p-4 md:p-12">

# Hello world

</div>

<img class="h-full object-cover" src="https://designstem.github.io/fachwerk/images/example.jpg" />
```

</div>

<img class="h-full object-cover" src="https://designstem.github.io/fachwerk/images/example.jpg" />

---
class: bg-gray-800 grid place-content-center place-items-center prose-invert
---

<f-math>Oh\ yes, math</f-math>

<f-math>\begin{pmatrix} a & c & e \\\\ b & d & f \\\\ 0 & 0 & 1 \end{pmatrix}</f-math>

---
title: Variables
---

## Fachwerk variables

To use reactive variables use Fachwerk's builtin `f` object that can contain any number of variables.

Lets set a variable `f.x` and control it with a slider:

<pre v-pre>
&lt;f-slider v-model="f.x" />  {{ f.x }}
</pre>

<f-slider v-model="f.x" /> {{ f.x }}

---

## Custom variables and functions

#### Setting up

When you need to do more complex data processing, you can set up the VueJS variables and functions in Javascript.

To do so, edit the `slides.js` file:

```js
import { ref, computed } from "vue";
const x = ref(0);
const y = computed(() => x.value * 10);
const reset = () => x.value = 0

export const setup = { customX, customY, customReset }
```

---

## Custom variables and functions

#### Usage in Markdown

You can access VueJS variables in Markdown as follows:

<pre v-pre>
&lt;f-slider v-model="customX" /> {{ customY }}

&lt;button v-on:click="customReset">Reset&lt/button>
</pre>

<f-slider v-model="customX" /> {{ customY }}

<button v-on:click="customReset">Reset</button>

---
title: Components
---

## Custom components

#### Defining a component

You can also define custom components in `slides.js`:

```js
import { ref, computed } from "vue";
import { f } from "fachwerk";

const CustomComponent = {
  setup() { return { f } },
  template: `<div class="opacity-50">I am CustomComponent using Fachwerk's f.x: ﹛﹛ f.x ﹜﹜</div>`
}

export const components = { CustomComponent }
```

---

## Custom components

#### Usage in Markdown

Here's how to use the component in `slides.md`:

```
<CustomComponent />

<f-slider v-model="f.x" />
```

<CustomComponent />

<f-slider v-model="f.x" />

---
title: Loader
---

## Custom loader

By default Fachwerk Slide loads the slide data using `fetch()` from `slides.md`. However you can override the loader function in `slides.js` to load the Markdown files from anywhere.

Here is an example to load two Markdown files, `first.md` and `second.md` and merge them together:

```js
const files = ["first.md", "second.md"]
export const loader = Promise.all(
  files.map((file) => fetch(file).then((res) => res.text()))
).then((files) => files.join(""));
```

---
title: Changelog
class: bg-lightblue-100
---

## Fachwerk Slides changelog

#### 0.0.4

- feat: Allow defining `{ setup, components, loader }` in `slides.js`
- Allow define `global:` metadata
- Fixing menu opening / closing
- Bigger navigation controls

---
title: Backpage
class: bg-[lightblue] grid place-items-center 
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
