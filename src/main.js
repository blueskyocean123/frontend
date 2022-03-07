import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from './service/axios';
import GAuth from 'vue-google-oauth2'

Vue.config.productionTip = false;

Vue.prototype.$Axios = axios;
Vue.use(GAuth, { clientID: "679411229122-e2n0ef01bj76cbje53oqmvjhehfjhn5o.apps.googleusercontent.com", scope: 'profile email'});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
