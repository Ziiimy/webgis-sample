import Vue from 'vue';
import router from 'vue-router';

import HomePage from '../pages/HomePage';
import OneMap from '../pages/OneMap';
import MapCompare from '../pages/MapCompare'

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
        },
        {
            path: '/mapcompare',
            component: MapCompare
        },

    ],
    mode: 'history'
}); 