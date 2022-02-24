import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {

    _defaultView: '666',
};

const getters = {

    _getDefaultView() {
        return state._defaultTView;
    }
};

const mutations = {

    _setDefaultView(state, value) {
        state._defaultView = value;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});

export default store;