<template>
    <div class="map-page"><MapView /><MapTools /><MapTree /><MapNav /><WFSLayers /></div>
</template>

<script>
import MapView from '../components/MapViewer';
import MapTools from '../components/MapTools';
import MapTree from '../components/MapTree';
import MapNav from '../components/RigionNavigator';
import WFSLayers from '../components/WFSLayers';

export default {
    name: 'OneMap',
    components: { MapView, MapTools, MapTree, MapNav, WFSLayers },
};
</script>

<style>
.map-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>