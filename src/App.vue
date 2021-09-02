<template>
  <div id="app" class="container">
    <PowerRankings />
    <PrintButton />
  </div>
</template>

<script>
import PowerRankings from "./components/PowerRankings.vue";
import PrintButton from "./components/PrintButton.vue";
import './assets/custom.css';
export default {
  name: "app",
  components: {
    PowerRankings,
    PrintButton
  }
};
</script>

