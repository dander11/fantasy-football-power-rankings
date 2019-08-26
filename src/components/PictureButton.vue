<template>
  <button type="button" id="capture-button" v-on:click="captureDiv" class="btn btn-primary">Capture</button>
</template>

<script lang="ts">
import html2canvas from "html2canvas";
import Canvas2Image from "canvas2image";
export default {
  name: "CaptureButton",
  methods: {
    captureDiv: function() {
      html2canvas(document.body, {
        onrendered: function(canvas) {
          Canvas2Image.saveAsPNG(canvas);
        }
      });
    }
  }
};
</script>