import Map from 'ol/Map';
import View from 'ol/View';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import Projection from 'ol/proj/Projection';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS';

const layers = [
    new TileLayer({
        source: new TileWMS({
            attributions:
                '© <a href="http://www.geo.admin.ch/internet/geoportal/' +
                'en/home.html">Pixelmap 1:1000000 / geo.admin.ch</a>',
            crossOrigin: 'anonymous',
            params: {
                LAYERS: 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
                FORMAT: 'image/jpeg',
            },
            url: 'https://wms.geo.admin.ch/',
        }),
    }),
    new ImageLayer({
        source: new ImageWMS({
            attributions:
                '© <a href="http://www.geo.admin.ch/internet/geoportal/' +
                'en/home.html">National parks / geo.admin.ch</a>',
            crossOrigin: 'anonymous',
            params: { LAYERS: 'ch.bafu.schutzgebiete-paerke_nationaler_bedeutung' },
            serverType: 'mapserver',
            url: 'https://wms.geo.admin.ch/',
        }),
    }),
];

// A minimal projection object is configured with only the SRS code and the map
// units. No client-side coordinate transforms are possible with such a
// projection object. Requesting tiles only needs the code together with a
// tile grid of Cartesian coordinates; it does not matter how those
// coordinates relate to latitude or longitude.
const projection = new Projection({
    code: 'EPSG:21781',
    units: 'm',
});

const map = new Map({
    layers,
    target: 'map',
    view: new View({
        center: [660000, 190000],
        projection,
        zoom: 9,
    }),
});
