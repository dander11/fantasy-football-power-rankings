import Vue from 'vue'
import App from './App.vue'
import wysiwyg from "vue-wysiwyg";
import vClickOutside from 'v-click-outside'
import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
  name: '_blank',
  specs: [
    'fullscreen=no',
    'titlebar=no',
    'scrollbars=no'
  ],

  styles: [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    './assets/custom.css'
  ]
}

Vue.use(VueHtmlToPaper, options);
Vue.use(vClickOutside)
Vue.use(wysiwyg, {});

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')