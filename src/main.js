import Vue from 'vue'
import App from './App.vue'
import wysiwyg from "vue-wysiwyg";
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)
Vue.use(wysiwyg, {});

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
