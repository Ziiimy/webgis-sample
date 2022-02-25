<template>
    <div class="map-page"><MapView /><MapTools /><MapTree /></div>
</template>

<script>
import MapView from '../components/MapViewer';
import MapTools from '../components/MapTools';
import MapTree from '../components/MapTree';

export default {
    name: 'OneMap',
    components: { MapView, MapTools, MapTree },
};
</script>

<style>
.map-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>