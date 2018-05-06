var canvas = document.getElementById('map');
canvas.width = 1920;
canvas.height = 1080;
var ctx = canvas.getContext("2d");

var levels = 20;
levels = 12;

var waterLevel = 0.3;

noise.seed(43);
for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
        // All noise functions return values in the range of -1 to 1.

        var h, s, l;
        var elevation = noise.simplex2(0.004 * x, 0.004 * y);
        elevation += 0.2 * noise.simplex2(0.02 * x, 0.02 * y);
        elevation += 0.05 * noise.simplex2(0.08 * x, 0.08 * y);

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