<template>
    <div class="map-page">
        <MapView />
        <MapTools ref="childContainer"></MapTools>
        <MapTree /><MapNav /><SpaceQuery />
        <SwipeMapPannel @startSwipe="startSwipe"> </SwipeMapPannel>
    </div>
</template>

<script>
import MapView from '../components/MapViewer';
import MapTools from '../components/MapTools';
import MapTree from '../components/MapTree';
import MapNav from '../components/RigionNavigator';
import SpaceQuery from '../components/SpaceQueyTable';
import SwipeMapPannel from '../components/SwipeMapPannel';

export default {
    name: 'OneMap',
    components: { MapView, MapTools, MapTree, MapNav, SpaceQuery, SwipeMapPannel },
    methods: {
        startSwipe() {
            this.$refs.childContainer.startSwipe();
        },
    },
};
</script>

<style>
.map-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>