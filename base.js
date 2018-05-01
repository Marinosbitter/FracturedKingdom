var map;
function initMap() {
    function CoordMapType(tileSize) {
        this.tileSize = tileSize;
    }

    CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var div = ownerDocument.createElement('div');
        div.innerHTML = coord;
        div.style.width = this.tileSize.width + 'px';
        div.style.height = this.tileSize.height + 'px';
        div.style.fontSize = '10';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '1px';
        div.style.borderColor = '#AAAAAA';
        return div;
    };

    CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var canvas = ownerDocument.createElement('canvas');
        canvas.style.width = this.tileSize.width + 'px';
        canvas.style.height = this.tileSize.height + 'px';

        var ctx = canvas.getContext("2d");

        noise.seed(Math.random());
        for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {
                // All noise functions return values in the range of -1 to 1.

                // noise.simplex2 and noise.perlin2 for 2d noise
                var value = noise.simplex2(x / 100, y / 100);
                // ... or noise.simplex3 and noise.perlin3:
                //var value = noise.simplex3(x / 100, y / 100, time);
                
                r = 255;
                g = 255;
                b = 255;
                a = Math.abs(value) * 256;

                ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
                ctx.fillRect( x, y, 1, 1 );

//                image[x][y].r = Math.abs(value) * 256; // Or whatever. Open demo.html to see it used with canvas.
            }
        }

        return canvas;
    }

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 52.0769272, 
            lng: 4.4862979
        },
        zoom: 8
    });

    map.overlayMapTypes.insertAt(
        0, new CoordMapType(new google.maps.Size(256, 256)));
}