<template>
    <div class="wfslayers"></div>
</template>

<script>
import { loadModules } from 'esri-loader';
export default {
    name: 'WFSLayers',
    components: {},
    methods: {
        mounted: function () {
            this._createWFSLyers();
        },
        async _createWFSLyers() {
            const [WFSLayer] = await loadModules(['esri/layers/WFSLayer']);
            const provinceWfsLayer = WFSLayer({
                url: 'http://localhost:8088/geoserver/geodata/ows?service=WFS&version=2.0.0&request=GetFeature',
                name: 'sheng_Project',
            });
            const city1WfsLayer = WFSLayer({
                url: 'http://localhost:8088/geoserver/geodata/ows?service=WFS&version=2.0.0&request=GetFeature',
                name: 'CNshiA_Dissolve1_Identity',
            });
            const city2WfsLayer = WFSLayer({
                url: 'http://localhost:8088/geoserver/geodata/ows?service=WFS&version=2.0.0&request=GetFeature',
                name: 'sheng_Project',
            });
            /*const query1 = provinceWfsLayer.createQuery();
            const query2 = city1WfsLayer.createQuery();*/
            this.$store.commit('_setProvincewfslayer', provinceWfsLayer);
            this.$store.commit('_setCity1wfslayer', city1WfsLayer);
            this.$store.commit('_setCity2wfslayer', city2WfsLayer);
        },
    },
};
</script>

<style>
</style>