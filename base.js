var canvas = document.getElementById('map');
var ctx = canvas.getContext("2d");

var zoom = 7;
var levels = 255/5;

noise.seed(Math.random());
for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
        // All noise functions return values in the range of -1 to 1.

        var nx = x/canvas.width - 0.5, ny = y/canvas.height - 0.5;
        var elevation = noise.simplex2(nx * zoom, ny * zoom);

        elevation = 255 * elevation;
        elevation = (elevation + 255) / 2;
        elevation = Math.ceil(elevation / levels) * levels;
        var r = elevation;
        var g = elevation;
        var b = elevation;
        var a = 255;

        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        ctx.fillRect( x, y, 1, 1 );
        
        if(y==0){
            console.info(elevation);
        }
    }
}