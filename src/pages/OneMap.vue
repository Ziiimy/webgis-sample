<template>
    <div class="map-page"><MapView /></div>
</template>

<script>
import MapView from '../components/MapViewer';

export default {
    name: 'OneMap',
    components: { MapView },
};
</script>

<style>
.map-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>