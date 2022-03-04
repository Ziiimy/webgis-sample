import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {

    _defaultView: '',
    _defaultVNav: false,
    _defaultTreeStat: false,
    _defaultwfslayer: '',
    _setDefaultmap: ""
};

const getters = {

    _getDefaultView() {
        return state._defaultView;
    },
    _getDefaultTreeStat() {
        return state._defaultTreeStat;
    },
    _getDefaultNav() {
        return state._defaultNav;
    },
    _getDefaultwfslayer() {
        return state._defaultwfslayer;
    },
    _getDefaultMap() {
        return state._defaultmap;
    }

};

const mutations = {

    _setDefaultView(state, value) {
        state._defaultView = value;
    },
    _setDefaultTreeStat(state, value) {
        state._defaultTreeStat = value;
    },
    _setDefaultNav(state, value) {
        state._defaultNav = value;
    },
    _setDefaultwfslayer(state, value) {
        state._defaultwfslayer = value;
    },
    _setDefaultMap(state, value) {
        state._setDefaultmap = value;
    }

};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});

export default store;