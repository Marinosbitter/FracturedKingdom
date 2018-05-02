var canvas = document.getElementById('map');
var ctx = canvas.getContext("2d");

noise.seed(42);
for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
        // All noise functions return values in the range of -1 to 1.

        var elevation = noise.simplex2(x, y);
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