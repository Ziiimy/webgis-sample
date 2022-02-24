<template>
    <div class="map-page"><MapView /><MapTools /></div>
</template>

<script>
import MapView from '../components/MapViewer';
import MapTools from '../components/MapTools.vue';

export default {
    name: 'OneMap',
    components: { MapView, MapTools },
};
</script>

<style>
.map-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>