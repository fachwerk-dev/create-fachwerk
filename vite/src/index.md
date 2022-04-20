<script setup>
const x = $ref(10);
</script>

# Hello Fachwerk

## Local data

<f-slider v-model="x" />

<f-math>x = {{ x }}</f-math>

## Global data

<f-slider v-model="data.x" />

<f-math>data.x = {{ data.x }}</f-math>
