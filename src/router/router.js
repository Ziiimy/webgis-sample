import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../pages/HomePage';
import OneMap from '../pages/OneMap';

Vue.use(Router);

export default new Router({
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