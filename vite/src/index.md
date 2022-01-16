<script setup>
const x = $ref(10);
</script>

## Local state

<f-slider v-model="x" />

<f-math>x = {{ x }}</f-math>

## Global state

<f-slider v-model="f.x" />

<f-math>f.x = {{ f.x }}</f-math>
