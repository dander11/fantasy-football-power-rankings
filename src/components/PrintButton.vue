<template>
  <div class="container row justify-content-center">
    <div id="print-area" class="hide" style="display: none;" v-html="printAreaText"></div>
    <div class="col-sm-3">
      <button class="btn btn-primary" v-on:click="print">Print Rankings</button>
    </div>
    <div class="col-sm-3">
      <button class="btn btn-primary" v-on:click="savePage">Save Rankings</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PrintButton",
  data: function() {
    return {
      printAreaText: ""
    };
  },
  methods: {
    print() {
      this.updatePrintArea();
      this.$htmlToPaper("print-area");
    },
    updatePrintArea() {
      if (document.getElementById("powerRanking") && document.head) {
        var rankingHtml = document.getElementById("powerRanking").outerHTML;
        var headHtml = document.head.innerHTML;
        this.printAreaText = headHtml + rankingHtml;
      } else {
        this.printAreaText = "";
      }
    },
    savePage() {
      this.updatePrintArea();
      setTimeout(function() {
        //do what you need here
        var data = document.getElementById("print-area").innerHTML;
        data = "<!DOCTYPE html><html>" + data + "</html>";
        const blob = new Blob([data], { type: "text/plain" });
        const e = document.createEvent("MouseEvents"),
          a = document.createElement("a");
        a.download = "powerRanking.html";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/html", a.download, a.href].join(":");
        e.initEvent("click", true, false);
        a.dispatchEvent(e);
      }, 2000);
    }
  }
};
</script>