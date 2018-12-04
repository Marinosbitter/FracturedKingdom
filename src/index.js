import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import {fromLonLat} from 'ol/proj.js';
import {OSM, TileDebug} from 'ol/source.js';


var osmSource = new OSM();
var map = new Map({
    layers: [
        new TileLayer({
            source: osmSource
        }),
        new TileLayer({
            source: new TileDebug({
                projection: 'EPSG:3857',
                tileGrid: osmSource.getTileGrid()
            })
        })
    ],
    target: 'map',
    view: new View({
        center: fromLonLat([-0.1275, 51.507222]),
        zoom: 10
    })
});