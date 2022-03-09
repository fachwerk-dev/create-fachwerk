---
class: bg-[lightblue] grid place-content-center place-items-center	
---

# ▦ Fachwerk Slides

Press `‹` `›` to navigate

---

## About

Fachwerk Slides is an experimental distribution of Fachwerk library. It combines [Fachwerk](https://fachwerk.dev/) components and utilities, Tailwind [Play CDN](https://tailwindcss.com/docs/installation/play-cdn)  styling and is based on [Slidev](https://sli.dev/guide/syntax.html) presentation format (extended Markdown).

## Getting started

Run the following in command line:

```
npm init fachwerk
```

And choose `Slides (experimental)` as a template

---

## Editing slides

Start with `slides.md` file. 

To separate slides, use `---` as a separator:

```md
# Slide 1

---

# Slide 2

```

---

## Slide metadata

Slides can also have metadata or _frontmatter_. It is stored in YAML format can be added as follows. Note that only `class:` and `style:` metadata is currently supported.

```md
---
some: value
---

# Slide 1

---
other: value
---

# Slide 2

```

---
class: bg-yellow-500
---

## Styling slides

To style the slides, add `class:` to the metadata with Tailwind classes.

Here's how to make the background yellow:


```
---
class: bg-yellow-500
---
```

---
class: bg-gray-900 prose-invert
---

## Dark theme

To style the slide with dark background it is recommended to invert also the text colors with `prose-invert` class:

```yaml
---
class: bg-gray-900 prose-invert
---
```

---
class: grid place-content-center place-items-center	
---

# Centering

To center the content, use CSS Grid centering:

```yaml
---
class: grid place-content-center place-items-center	
---
```

---
class: prose-invert
style: "background-image: url(https://designstem.github.io/fachwerk/images/example.jpg)"
---

## Background images

To add a background image, use style metadata:

`style: "background-image: url(your-image-here.jpg)"`


---
class: bg-gray-800 grid place-content-center place-items-center prose-invert
---

<f-math>Oh\ yes, math</f-math>

<f-math>\begin{pmatrix} a & c & e \\\\ b & d & f \\\\ 0 & 0 & 1 \end{pmatrix}</f-math>

---


## Reactive Fachwerk variables

To use reactive variables you can use Fachwerk's builtin `f` object that can contain any number of variables.

Lets set a variable `f.x` and control it with a slider:

<pre v-pre>
&lt;f-slider v-model="f.x" />  {{ f.x }}
</pre>

<f-slider v-model="f.x" /> {{ f.x }}

---

## Reactive VueJS variables

When you need to do more complex data processing you can set up the reactive and computed values in VueJS API and pass the them to `createFachwerk()` function:

```js
import { ref, computed } from "vue";
const x = ref(0);
const y = computed(() => x.value * 10);
createFachwerk({ x, y });
```

You can access them as follows in Markdown:

<pre v-pre>
&lt;f-slider v-model="x" max="100" /> {{ y }}
</pre>

<f-slider v-model="x" /> {{ y }}

---
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

See the source [here](https://github.com/fachwerk-dev/create-fachwerk/tree/main/slides)<br />More info at https://fachwerk.dev/
