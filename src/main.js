import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router/router';
import store from './store/'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition)
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
