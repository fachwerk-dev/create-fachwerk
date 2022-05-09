---
title: Frontpage
class: bg-[lightblue] grid place-content-center place-items-center text-center
# global:
#   class: bg-[lightblue]
---

<div class="text-8xl text-gray-800">▦</div>

<br />

# Fachwerk Slides

Press `‹` `›` to navigate

---
title: Get started
---

## About

Fachwerk Slides is an experimental distribution of the Fachwerk library. It combines [Fachwerk](https://fachwerk.dev/) components and utilities, [Tailwind Play CDN](https://tailwindcss.com/docs/installation/play-cdn) styling and [Slidev presentation format](https://sli.dev/guide/syntax.html) (based on Markdown). All this is packaged just into an HTML, JS, CSS, and MD file, and no build tools are needed for slide authoring.

## Get started

Run the following command and then choose `Slides (experimental)` as a template:

```
npm init fachwerk@latest
```

 You can re-run this command for updating the library, and it does not touch your work.

---
class: center bg-[lightblue]
---
 
<Icon id="bx:slideshow" class="w-24 h-24" />

<br />

# Create slides


---
title: Create slides
---

## Create slides

Start with `slides.md` file. 

To separate slides, use `---` as a separator:

```
# Frontpage
---
# About
```

---

## Slide metadata and menus

Slides can also have metadata or _frontmatter_. It is stored in [YAML format](https://dev.to/paulasantamaria/introduction-to-yaml-125f).

When adding `title:` metadata to pages, these pages appear in the menu. Click `≡` to toggle it.

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
 
<Icon id="bx:right-arrow-circle" class="w-24 h-24" />

<br />

# Add navigation

---
title: Add navigation
---

## Add navigation buttons

By default, slide navigation is linear and can be controlled with `‹` `›` buttons on the screen or keyboard.

However, you can set non-linear navigation by providing buttons to jump to a specific page. You can use `prev()` and `next()` functions to jump between pages:

```
<button v-on:click="next()">Goto next slide</button>
```

<button v-on:click="next()">Goto next slide</button>

---

## Go to the next page

You can also jump to a page with a specific title using `goto()` function:

```
<button v-on:click="next()">Go to next page</button>

<button v-on:click="goto('Style current slide')">Go to "Style the slide" page</button>
```

<button v-on:click="next()">Go to next page</button>

<button v-on:click="goto('Style current slide')">Go to "Style the slide" page</button>


---
class: center bg-[lightblue]
---
 
<Icon id="bx:paint-roll" class="w-24 h-24" />

<br />

# Style slides

---
title: Add some style
class: bg-amber-100
---

## Style current slide

To style the _current_ slide, add `class:` to the metadata with Tailwind classes.

Here's how to make the background light amber using [Tailwind color classes](https://tailwindcss.com/docs/customizing-colors):


```
---
class: bg-amber-200
---
```

---
class: bg-amber-200
---

## Style all slides

To style _all_ slides, add a `global:` section to the metadata.

Here's how to make background amber for all slides:

```
---
global:
  class: bg-amber-200
---
```

It is recommended to add this to the first slide; otherwise, subsequent global metadata will override the previous data.

---
class: bg-gray-900 prose-invert
---

## Go dark

To style the slide with a dark background, add a darker version of the color with `bg-gray-900` or similar. 

To invert the text color, use the `prose-invert` class. See more at Tailwind [typography plugin](https://tailwindcss.com/docs/typography-plugin).

```yaml
---
class: dark:bg-gray-900 prose-invert
---
```

To make all the slides dark when the user is in dark mode, use the following global class:
```yaml
---
global:
  class: dark:bg-gray-900 dark:prose-invert
---
```

---
class: center bg-[lightblue]
---
 
<Icon id="bx:layout" class="w-24 h-24" />

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
title: Custom layouts
---

## Add custom layouts

Adding many specific classes to slides is sometimes hard to memorize. To overcome this, add custom CSS classes to `slides.css` with Tailwind `@apply` directive and re-use them later.

Here is a custom `.center` class that centers elements on the slide:

```
.center {
    @apply grid place-content-center place-items-center text-center;  
}
```

Here is how to use it in slide metadata:

```
---
class: center
---
```

---
class: center bg-[lightblue]
---
 
<Icon id="bx:font-family" class="w-24 h-24" />

<br />

# Change fonts

---
title: Change fonts
---

## Change fonts

Fachwerk Slides uses [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) for serifs and [Cousine](https://fonts.google.com/specimen/Cousine) for monospaced typography, but you can use any font available in Google Fonts.

Here's how to change the defaults to [Inter](https://fonts.google.com/specimen/Inter) and [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) in `slides.js`:

```
export const fonts =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto+Mono&display=swap";

export const theme = {
  fontFamily: {
    sans: ["Inter", "sans-serif"],
    mono: ["Roboto Mono", "monospace"],
  },
}

```

---
class: center bg-[lightblue]
---

<Icon id="bx:cloud" class="w-24 h-24" />

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
<Icon id="bx:cloud" />
```

<Icon id="bx:cloud" />

---

## Customize icons

To customize the icon, use Tailwind classes:

```
<Icon id="bx:cloud" class="w-24 h-24 text-gray-400 hover:scale-150 transition" />

<Icon id="bx:cloud-snow" class="w-24 h-24 text-gray-600 hover:scale-150 transition" />

<Icon id="bx:cloud-lightning" class="w-24 h-24 text-gray-800 hover:scale-150 transition" />
```

<Icon id="bx:cloud" class="w-24 h-24 text-gray-400 hover:scale-150 transition" />

<Icon id="bx:cloud-snow" class="w-24 h-24 text-gray-600 hover:scale-150 transition" />

<Icon id="bx:cloud-lightning" class="w-24 h-24 text-gray-800 hover:scale-150 transition" />

---
class: center bg-[lightblue]
---
 
<Icon id="bx:image-alt" class="w-24 h-24" />

<br />

# Add images

---
title: Add images
class: prose-invert bg-cover bg-[url(https://designstem.github.io/fachwerk/images/example.jpg)]
---

## Add full image background

To add a background image to an entire slide, use the following class in the metadata:

```
---
class: prose-invert bg-cover bg-[url(https://your-image-here.jpg)]
---
```


---
class: p-0 md:p-0 md:grid md:grid-cols-2
---

<div class="p-4 md:p-[4vw]">

## Add partial image background

Here's how to create a responsive layout with a partial image background:

```
---
class: p-0 md:p-0 md:grid md:grid-cols-2
---
<div class="p-4 md:p-[5vw]">

# Hello world

</div>

<div class="bg-cover bg-[url(https://your-image-here.jpg)]" />
```

</div>

<div class="bg-cover h-screen bg-[url(https://designstem.github.io/fachwerk/images/example.jpg)]" />

---
class: center bg-[lightblue]
---

<Icon id="bx:math" class="w-24 h-24" />

<br />

# Add or subtract math

---
title: Add or subtract math
class: center bg-gray-900 prose-invert
---

<f-math>\begin{pmatrix} a & c & e \\\\ b & d & f \\\\ 0 & 0 & 1 \end{pmatrix}</f-math>

See more at https://fachwerk.dev/components/f-math

---
class: center bg-[lightblue]
---

<Icon id="bx:slider-alt" class="w-24 h-24" />

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

{{ data.names }}
---

## Display data

It is more useful to loop over the data to display it:

```
<div class="grid gap-4">
  <div
    v-for="name in data.names"
    class="p-4 bg-yellow-500 rounded"
  >
    ❴❴ name ❵❵
  </div>
</div>
```

<div class="flex gap-4">
  <div
    v-for="name in data.names"
    class="p-4 bg-yellow-500 rounded"
  >
    {{ name }}
  </div>
</div>

---
data: 
  x: 50
---

## Add reactive data

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

## Add custom data

When you need to do more complex data manipulation, you can define custom variables and functions in the `slides.js` file that will be available in Markdown:

```js
import { ref, computed } from "vue";
const x = ref(0);
const y = computed(() => x.value * 10);
const reset = () => x.value = 0
export const setup = { customX, customY, customReset }
```

You can access custom data in `slides.md` as follows:

<pre v-pre>
&lt;f-slider v-model="customX" /> {{ customX }} {{ customY }}
&lt;button v-on:click="customReset">Reset&lt/button> &lt;a v-on:click="customReset">Reset&lt;/a>
</pre>

<input type="range" v-model.number="customX" /> {{ customX }} {{ customY }} <a v-on:click="customReset">Reset</a>

---
class: center bg-[lightblue]
---

<Icon id="bx:category" class="w-16 h-16 md:w-24 md:h-24" />

<br />

# Add components

---
title: Add components
---

## Add custom component

You can define custom components in `slides.js`. For example, here is a simple `Info` component:

```js
const Info = {
  inheritAttrs: false,
  template: `
  <div class="grid grid-cols-[auto,1fr] gap-2">
    <Icon id="tabler:info-circle" class="w-6 h-6 translate-y-1" />
    <div v-bind="$attrs" class="text-gray-500"><slot /></div>
  </div>
  `,
};

export const components = { Info }
```

---

## Use custom component

Here's how to use the `Info` component in Markdown:

```
<Info>Here is a simple info box</Info>
```

<Info>Here is a simple info box</Info>

---
class: center bg-[lightblue]
---

<Icon id="bx:cog" class="w-24 h-24" />

<br />

# Customize loader

---
title: Customize loader
---

## Customize loader

By default, Fachwerk Slides loads the slide data using `fetch()` from `slides.md`. However, you can override the loader function in `slides.js` to load the Markdown files from anywhere.

Here is an example of loading two Markdown files, `first.md` and `second.md`, and merging them:

```js
const files = ["first.md", "second.md"]

export const loader = Promise.all(
  files.map((file) => fetch(file).then((res) => res.text()))
)
.then((files) => files.join(""));
```

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
