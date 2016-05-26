'use strict';

angular
    .module('video-wall-app')
    .service('mainService', mainService);

function mainService($q) {

    this.configurations = {
        configSelect: {
            name: '2x2'
        },
        availableConfigs: [
            {
                name: '2x2',
                x: 2,
                y: 2
            },
            {
                name: '3x3',
                x: 3,
                y: 3
            }
        ]
    };

}