<template>
  <div class="container row justify-content-center">
    <div id="print-area"  v-html="printAreaText"></div>
    <div class="col-sm-3">
      <button class="btn btn-primary" v-on:click="print">Print Rankings</button>
    </div>
    <div class="col-sm-3">
      <button class="btn btn-primary" v-on:click="savePage">Save Ranking HTML</button>
    </div>
    <div class="col-sm-3">
      <button class="btn btn-primary" v-on:click="saveImage">Save Ranking Image</button>
    </div>
  </div>
</template>

<script lang="ts">
import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';
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
    },
    saveImage() {
      var week = document.getElementById('week').value;
      var year = document.getElementById('year').value;
        var node = document.getElementById('rankings-table');
         htmlToImage.toPng(node)
          .then(function (dataUrl) {
           // var img = new Image();
            //img.src = dataUrl;
           // document.body.appendChild(img);
            var link = document.createElement('a');
            link.download = 'power-rankings-'+year.toString() +'-'+week.toString()+'.png';
            link.href = dataUrl;
            link.click();
          })
          .catch(function (error) {
           // console.error('oops, something went wrong!', error);
          });
    }
    
  }
};
</script>