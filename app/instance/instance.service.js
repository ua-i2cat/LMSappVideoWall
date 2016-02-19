'use strict';

angular
    .module('video-wall-app')
    .service('instanceService', instanceService);

function instanceService(apiFunctions, $q){

    this.connect = connect;

    function connect(){
        var deferred = $q.defer(),
            message = {
                'host' : sHost,
                'port' : sPort
            };

        apiFunctions.connect(message)
            .then(function succesCallback(response){
                deferred.resolve(response);
            }, function errorCallback(response) {
                deferred.reject(response);
            });

        return deferred.promise;
    }
}
