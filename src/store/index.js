import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {

    _defaultView: '',
    _defaultView2: '',
    _defaultVNav: false,
    _defaultTreeStat: false,
    _defaultNavStat: false,
    _Provincewfslayer: '',
    _City1wfslayer: '',
    _City2wfslayer: '',
    _Defaultmap: '',
    _SpaceQueryResult: [],
    _SpaceQueryVisible: '',
    _CompareMapview1: '',
    _CompareMapview2: '',
    _SwipePannelVisible: '',
    _SwipeButtonSwitch: false
};

const getters = {

    _getDefaultView() {
        return state._defaultView;
    },
    _getDefaultView2() {
        return state._defaultView2;
    },
    _getDefaultTreeStat() {
        return state._defaultTreeStat;
    },
    _getDefaultNavStat() {
        return state._defaultNavStat;
    },
    _getDefaultNav() {
        return state._defaultNav;
    },
    _getProvincewfslayer() {
        return state._Provincewfslayer;
    },
    _getCity1wfslayer() {
        return state._City1wfslayer;
    },
    _getCity2wfslayer() {
        return state._City2wfslayer;
    },
    _getDefaultMap() {
        return state._Defaultmap;
    },
    _getSpaceQueryResult() {
        return state._SpaceQueryResult;
    },
    _getSpaceQueryVisible() {
        return state._SpaceQueryVisible;
    },
    _getCompareMapview1() {
        return state._CompareMapview1;
    },
    _getCompareMapview2() {
        return state._CompareMapview2;
    },
    _getSwipePannelVisible() {
        return state._SwipePannelVisible;
    },
    _getSwipeButtonSwitch() {
        return state._SwipeButtonSwitch;
    }

};

const mutations = {

    _setDefaultView(state, value) {
        state._defaultView = value;
    },
    _setDefaultView2(state, value) {
        state._defaultView2 = value;
    },
    _setDefaultTreeStat(state, value) {
        state._defaultTreeStat = value;
    },
    _setDefaultNavStat(state, value) {
        state._defaultNavStat = value;
    },
    _setDefaultNav(state, value) {
        state._defaultNav = value;
    },
    _setProvincewfslayer(state, value) {
        state._Provincewfslayer = value;
    },
    _setCity1wfslayer(state, value) {
        state._City1wfslayer = value;
    },
    _setCity2wfslayer(state, value) {
        state._City2wfslayer = value;
    },
    _setDefaultMap(state, value) {
        state._Defaultmap = value;
    },
    _setSpaceQueryResult(state, value) {
        state._SpaceQueryResult = value;
    },
    _setSpaceQueryVisible(state, value) {
        state._SpaceQueryVisible = value;
    },
    _setCompareMapview1(state, value) {
        state._CompareMapview1 = value;
    },
    _setCompareMapview2(state, value) {
        state._CompareMapview2 = value;
    },
    _setSwipePannelVisible(state, value) {
        state._SwipePannelVisible = value;
    },
    _setSwipeButtonSwitch(state, value) {
        state._SwipeButtonSwitch = value;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});

export default store;