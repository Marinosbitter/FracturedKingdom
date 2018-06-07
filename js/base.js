// variables //
var mapVariables = {
    baseMap:{
        seed: 42,
        frequency: 0.005,
        octaves: {
            0:{
                weight: 1,
                freqModX: 1,
                freqModY: 1
            },
            1:{
                weight: 0.5,
                freqModX: 3,
                freqModY: 3
            },
            2:{
                weight: 0.25,
                freqModX: 6,
                freqModY: 6
            },
            3:{
                weight: 0.125,
                freqModX: 12,
                freqModY: 12
            }
        },
        redistribution: 1
    }
};

var canvas = document.getElementById("map");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var ctx = canvas.getContext("2d");

noise.seed(mapVariables.baseMap.seed);

var count = Object.keys(mapVariables.baseMap.octaves).length;
var normalizer = 0;
for (i = 0; i < count; i++){
    normalizer += mapVariables.baseMap.octaves[i].weight;
}
for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
        var coordData = {
            coordHeight: 0
        };
        for(i = 0; i < count; i++){
            coordData.coordHeight += mapVariables.baseMap.octaves[i].weight * noise.simplex2(mapVariables.baseMap.octaves[i].freqModX * mapVariables.baseMap.frequency * x, mapVariables.baseMap.octaves[i].freqModY * mapVariables.baseMap.frequency * y - 100);
        }
        coordData.coordHeight = (coordData.coordHeight+normalizer)/(2*normalizer); // Brings the values from -1 to 1 back to 0 to 1
        coordData.coordHeight = Math.pow(coordData.coordHeight, mapVariables.baseMap.redistribution);

        ctx.fillStyle = "rgba(0, 255, 0, 1)";

        if(coordData.coordHeight < 0.6){
            ctx.fillStyle = "#0000ff";
        }
        // For debugging, makes values below 0 red, above 1 green
        if(coordData.coordHeight <= 0){
            ctx.fillStyle = "#ff0000";
        }
        if(coordData.coordHeight >= 1){
            ctx.fillStyle = "#00ff00";
        }
        ctx.fillRect(x,y,1,1);
    }
}