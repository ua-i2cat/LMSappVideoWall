'use strict';

angular
    .module('video-wall-app')
    .factory('instanceService', instanceService);

function instanceService(apiFunctions, $q){

    var service = {
        connect: connect
    };

    return service;

    function connect(message){
        var deferred = $q.defer();

        apiFunctions.connect(message)
            .then(function succesCallback(response){
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
            });

        return deferred.promise;

    }
}
