<script setup>
const x = $ref(10);
</script>

## Local state

<f-slider v-model="x" />

<f-math>x = {{ x }}</f-math>

## Global state

<f-slider v-model="v.x" />

<f-math>v.x = {{ v.x }}</f-math>
