'use strict';

function apiFunctions($http, $q) {

    var service = {
        configureFilter: configureFilter,
        createFilter: createFilter,
        createPath: createPath,
        deletePath: deletePath,
        getState: getState,
        connect: connect,
        disconnect: disconnect
    };

    return service;

    function configureFilter(filterId, action, params){
        var uri = apiUri + '/filter/' + filterId,
            message = [{
                "action": action,
                "params": params
            }];

        return $http({
            method: 'PUT',
            url: uri,
            data: JSON.stringify(message),
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(succesCallback, errorCallback);
    }

    function createFilter(filterId, type){
        var uri = apiUri + '/createFilter',
            message = {'id': Number(filterId), 'type': type};


        return $http({
            method: 'POST',
            url: uri,
            data: JSON.stringify(message),
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(succesCallback, errorCallback);

    }

    function createPath(pathId, orgFilterId, dstFilterId, orgWriterId, dstReaderId, midFiltersIds){
        var uri = apiUri + '/createPath',
            message = {
                'id': pathId, 'orgFilterId': orgFilterId, 'dstFilterId': dstFilterId,
                'orgWriterId': orgWriterId, 'dstReaderId': dstReaderId, 'midFiltersIds': midFiltersIds
            };

        lmsPaths.push(message);

        return $http({
            method: 'POST',
            url: uri,
            data: JSON.stringify(message),
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(succesCallback, errorCallback);
    }

    function deletePath(pathId){
        var uri = apiUri + '/path/' + pathId;

        return $http({
            method: 'DELETE',
            url: uri,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(succesCallback, errorCallback);
    }

    function getState() {
        var uri = apiUri + '/state';

        return $http({
            method: 'GET',
            url: uri,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(succesCallback, errorCallback);
    }

    function connect(message){
        var uri = apiUri + '/connect';

        return $http({
            method: 'POST',
            url: uri,
            data: message,
            headers: {'Content-Type': 'application/json'}
        }).then(succesCallback, errorCallback);
    }

    function disconnect(){
        var uri = apiUri + '/disconnect';

        return $http({
            method: 'GET',
            url: uri,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(succesCallback, errorCallback);
    }

    function succesCallback(response) {
        if (!response.data.error) {
            return response.data.message;
        } else {

            return $q.reject(response.data.error);
        }

    }

    function errorCallback() {
        return $q.reject('No API available.');
    }
}

angular
    .module('video-wall-app')
    .factory('apiFunctions', apiFunctions);