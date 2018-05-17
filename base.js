/**
 * Initialiezes the Google map
 * @returns {string} Google map object
 */
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 1,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['fractured']
        }
    });

    // Displayes 
    CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var normalizedCoord = getNormalizedCoord(coord, zoom);
        if (!normalizedCoord) {
            return null;
        }
        var canvas = ownerDocument.createElement('canvas');
        canvas.width = this.tileSize.width;
        canvas.height = this.tileSize.height;
        canvas.style.width = this.tileSize.width + 'px';
        canvas.style.height = this.tileSize.height + 'px';
        canvas.style.borderStyle = 'solid';
        canvas.style.borderWidth = '1px';
        canvas.style.borderColor = '#AAAAAA';
        canvas = generateCanvas(canvas, normalizedCoord, zoom);
        return canvas;
    };

    // This is only needed for reference and should not be visible
    var fracturedMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return '//via.placeholder.com/256x256?text=Z:+' + 
                zoom + '+X:+' + normalizedCoord.x + '+Y:+' +
                (bound - normalizedCoord.y - 1);
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 9,
        minZoom: 0,
        name: 'Fractured Kingdom'
    });

    map.mapTypes.set('fractured', fracturedMapType);
    map.setMapTypeId('fractured');
    map.overlayMapTypes.insertAt(
        0, new CoordMapType(new google.maps.Size(256, 256)));

    // Helper functions
    function CoordMapType(tileSize) {
        this.tileSize = tileSize;
    }
}
function getTileSize(){
    var tileSize = {
        x: 256,
        y: 256
    }
    return tileSize;
}
/**
 * Normalizes the coords that tiles repeat across the x axis (horizontally) like the standard Google map tiles.
 * @param   {object} The  coordinate of the tile
 * @param   {number} zoom Current zoom level of the map
 * @returns {object} Normalized Coord
 */
function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
        return null;
    }

    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
        x = (x % tileRange + tileRange) % tileRange;
    }

    return {x: x, y: y};
}

/**
 * Fills a canvas for a Google Maps tile
 * @param   {object} canvas The canvas used on the tile
 * @param   {object} coord  The tile coordinate
 * @param   {number} zoom   Zoom level of the ma[]
 * @returns {canvas} The painted canvas
 */
function generateCanvas(canvas, coord, zoom){
    var ctx = canvas.getContext("2d");

    var levels = 20;
    levels = 12;

    var waterLevel = 0.3;
    
    noise.seed(43);
    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {
            // Adjusting x and y coordinates to tiled versions
            var cX = x + (getTileSize.x * (coord.x + 1));
            var cY = y + (getTileSize.y * (coord.y + 1));
            var h, s, l;
            // All noise functions return values in the range of -1 to 1.
            var elevation = noise.simplex2(0.004 * cX, 0.004 * cY);
            elevation += 0.2 * noise.simplex2(0.02 * cX, 0.02 * cY);
            elevation += 0.05 * noise.simplex2(0.04 * cX, 0.04 * cY);

            elevation = (elevation +1) / 2;

            if(elevation < waterLevel){
                h = 130;
                l = 34;
            } // Is land
            else {
                h = 184;
                l = 50;
            } // Is water
            s = 100;

            ctx.fillStyle = "hsl("+h+", "+s+"%, "+l+"%)";
            ctx.fillRect( x, y, 1, 1 );
        }
    }
    return canvas;
}