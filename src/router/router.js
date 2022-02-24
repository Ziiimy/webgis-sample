import Vue from 'vue';
import router from 'vue-router';

import HomePage from '../pages/HomePage';
import OneMap from '../pages/OneMap';

Vue.use(router);

export default new router({
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/map',
            component: OneMap
        }
    ],
    mode: 'history'
}); 