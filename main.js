// Singapore
var coords = [1.306487, 103.835907];

var world = VIZI.world('world', {
    skybox: true,
    postProcessing: true
}).setView(coords);

// Set position of sun in sky
world._environment._skybox.setInclination(0.3);

// Add controls
VIZI.Controls.orbit().addTo(world);

// Leave a single CPU for the main browser thread
world.createWorkers(7).then(function() {
    console.log('Workers ready');

    // CartoDB basemap
    VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(world);

    //for whole singapore roads
    VIZI.geoJSONLayer('Data/roads.json', {
        output: true,
        interactive: false,
        style: function (feature) {

            return {
                lineColor: '#f7c616',
                lineWidth: 1,
                lineTransparent: true,
                lineOpacity: 0.2,
                lineBlending: THREE.AdditiveBlending,
                lineRenderOrder: 2
            };

        }

    }).addTo(world);

    //for whole singapore building layer
    VIZI.geoJSONLayer('Data/buildings.json', {
        output: true,
        interactive: false,
        style: function (feature) {
            var color;

            if (feature.properties.energysum) {
                height = feature.properties.energysum /10;
                if(height > 1000) {
                    color = '#F70C05'
                }else if (height > 800 & height < 1000)
                {color = '#f7ce12'}
                else if (height > 600 & height < 800)
                {color = '#dff716'}
                else if (height > 400 & height < 600)
                {color = '#b7f712'}
                else if (height > 200 & height < 400)
                {color = '#b7f712'}
                else if (height > 0 & height < 200)
                {color = '#65f717'}
            } else {
                height = 10 + Math.random() * 10;
            }


            return {
                height: height,
                color: color
            };

        },
        filter: function(feature) {
            // Don't show points
            return feature.geometry.type !== 'Point';
        }
    }).addTo(world);

});