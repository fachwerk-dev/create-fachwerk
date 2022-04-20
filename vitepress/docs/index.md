<script setup>
const x = $ref(10);
</script>

# Hello Fachwerk

### Local data

<f-slider v-model="x" />

<f-math>x</f-math> is {{ x }}
