var map;
function initMap() {
    function CoordMapType(tileSize) {
        this.tileSize = tileSize;
    }

    CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var canvas = ownerDocument.createElement('canvas');
        canvas.style.width = this.tileSize.width + 'px';
        canvas.style.height = this.tileSize.height + 'px';

        var ctx = canvas.getContext("2d");

        noise.seed(42);
        for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {
                // All noise functions return values in the range of -1 to 1.

                var elevation = noise.simplex2(x /100, y/100);
                elevation *= 255;
                elevation = Math.abs(elevation);
                var r = elevation;
                var g = elevation;
                var b = elevation;
                var a = 255;

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
        zoom: 8
    });

    map.overlayMapTypes.insertAt(
        0, new CoordMapType(new google.maps.Size(256, 256)));
}