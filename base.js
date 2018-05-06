var map;
function initMap() {
    function CoordMapType(tileSize) {
        this.tileSize = tileSize;
    }

    CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        console.info("Map zoom: " + map.getZoom());
        
        var canvas = ownerDocument.createElement('canvas');
        canvas.style.width = this.tileSize.width + 'px';
        canvas.style.height = this.tileSize.height + 'px';
        var ctx = canvas.getContext("2d");

        //** Inputs **//
        var inputSeed = 42  ;
        var inputZoom = 1; // AKA Zoom
        var inputExp = 2; // AKA Normalization
        var inputWaterLevel = 0.4; // AKA amm of water
        var inputTerraces = 20; // AKA Heightlines (aestetic)

        //** Normalize inputs **//
        var seed = inputSeed;
        var freq = map.getZoom() + 1;
        var exp = inputExp;
        var waterLevel = inputWaterLevel;
        var terraces = inputTerraces;
        
        console.info(freq);

        noise.seed(inputSeed);
        for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {
                var r = 0;
                var g = 0;
                var b = 0;
                var a = 0;
                
                var mapsX = x;
                var mapsY = y;

                var nx = mapsX/canvas.width - 0.5, ny = mapsY/canvas.height - 0.5;

                //== Landscape ==//
                var elevation = noise.simplex2(freq * nx, freq * ny);
                elevation += 0.5 * noise.simplex2(freq * 2 * nx, freq * 2 * ny);
                elevation += 0.25 * noise.simplex2(freq * 4 * nx, freq * 2 * ny);

                elevation = Math.abs(elevation);    // Make number positive
                elevation = Math.pow(elevation, inputExp);

                r = elevation;
                g = elevation;
                b = elevation;

                //== Water Level ==//
                if(elevation < waterLevel){
                    b = elevation / waterLevel;
                    r = 0;
                    g = 0;
                }

                //** Enabeling terraces **//
                r = Math.round(r * terraces) / terraces;
                g = Math.round(g * terraces) / terraces;
                b = Math.round(b * terraces) / terraces;

                //** Shifting values to 0-255 **//
                r = r * 200;
                g = g * 200;
                b = b * 200;
                a = 255;

                //** Setting colors and painting on canavs **//
                ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
                ctx.fillRect( x, y, 1, 1 );
            }
        }

        return canvas;
    }

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 52.0769272, 
            lng: 4.4862979
        },
        zoom: 0
    });

    map.overlayMapTypes.insertAt(
        0, new CoordMapType(new google.maps.Size(256, 256)));
}