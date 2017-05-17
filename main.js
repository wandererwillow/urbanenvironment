 // init view point for vizicities
            var coords =[1.306487, 103.835907];

            var world = VIZI.world('world', {
                skybox: true,
                postProcessing: false
            }).setView(coords);
            // Set position of sun in sky
            world._environment._skybox.setInclination(0.3);

            // Add controls
            VIZI.Controls.orbit().addTo(world);
            // Add fundamental map
            VIZI.imageTileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" >OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
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
                
                
                             height = 1000 + Math.random() * 300;
                
                             return {
                                 height: height
                
                             };
                
                         },
                         filter: function(feature) {
                             // Don't show points
                             return feature.geometry.type !== 'Point';
                         }
                     }).addTo(world);
