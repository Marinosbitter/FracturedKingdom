// variables //
var mapVariables = {
    frequency: 0.05,
    octaves: {
        0:{
            weight: 1,
            freqModX: 1,
            freqModY: 1
        },
        1:{
            weight: 0.5,
            freqModX: 2,
            freqModY: 2
        },
        2:{
            weight: 0.25,
            freqModX: 4,
            freqModY: 2
        }
    },
    redistribution: 1
}


var canvas = document.getElementById("map");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var ctx = canvas.getContext("2d");

noise.seed(42);

var count = Object.keys(mapVariables.octaves).length;
var normalizer = 0;
for (i = 0; i < count; i++){
    normalizer += mapVariables.octaves[i].weight;
}
for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
        var value = 0;
        for(i = 0; i < count; i++){
            value += mapVariables.octaves[i].weight * noise.simplex2(mapVariables.octaves[i].freqModX * mapVariables.frequency * x, mapVariables.octaves[i].freqModY * mapVariables.frequency * y - 100);
        }
        value = (value+normalizer)/(2*normalizer); // Brings the values from -1 to 1 back to 0 to 1
        value = Math.pow(value, mapVariables.redistribution);

        ctx.fillStyle = "rgba(0, 0, 0, "+value+")";
        // For debugging, makes values below 0 red, above 1 green
        if(value <= 0){
            ctx.fillStyle = "#ff0000";
        }
        if(value >= 1){
            ctx.fillStyle = "#00ff00";
        }
        ctx.fillRect(x,y,1,1);
    }
}