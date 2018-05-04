//** Map functions **//
var canvas = document.getElementById('map');
var cs     = getComputedStyle(canvas);
canvas.width  = parseInt( cs.getPropertyValue('width'), 10);
canvas.height = parseInt( cs.getPropertyValue('height'), 10);
var ctx = canvas.getContext("2d");

//** Inputs **//
var inputSeed = 42  ;
var inputZoom = 4; // AKA Zoom
var inputExp = 1; // AKA Normalization
var inputWaterLevel = 0.4; // AKA amm of water
var inputTerraces = 20; // AKA Heightlines (aestetic)

//** Normalize inputs **//
var seed = inputSeed;
var freq = inputZoom;
var exp = inputExp;
var waterLevel = inputWaterLevel;
var terraces = inputTerraces;

//** Map functions **//
var canvas = document.getElementById('map');
var cs     = getComputedStyle(canvas);
canvas.width  = parseInt( cs.getPropertyValue('width'), 10);
canvas.height = parseInt( cs.getPropertyValue('height'), 10);
var ctx = canvas.getContext("2d");

noise.seed(inputSeed);
for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;

        var nx = x/canvas.width - 0.5, ny = y/canvas.height - 0.5;

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
//    console.info(elevation);
}