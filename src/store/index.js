import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {

    _defaultView: '',
    _defaultTreeStat: false
};

const getters = {

    _getDefaultView() {
        return state._defaultView;
    },
    _getDefaultTreeStat() {
        return state._defaultTreeStat;
    }
};

const mutations = {

    _setDefaultView(state, value) {
        state._defaultView = value;
    },
    _setDefaultTreeStat(state, value) {
        state._defaultTreeStat = value;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});

export default store;