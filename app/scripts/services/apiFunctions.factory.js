'use strict';

function apiFunctions($http) {
    return {
        configureFilter: function(filterId, action, params){
            var uri = apiUri + '/filter/' + filterId,
                message = [{
                    "action": action,
                    "params": params
                }];

            $http({
                method: 'PUT',
                url: uri,
                data: JSON.stringify(message),
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).then(function succesCallback(response) {
                if (!response.data.error) {
                    console.log(response.data.message);
                } else {
                    console.log(response.data.error);
                }
              }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response.data.error + ' - No API available');
              });
        },

        createFilter: function(filterId, type){
            var uri = apiUri + '/createFilter',
                message = {'id': Number(filterId), 'type': type};


            $http({
                method: 'POST',
                url: uri,
                data: JSON.stringify(message),
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).then(function succesCallback(response) {
                if (!response.data.error) {
                    console.log(response.data.message);
                } else {
                    console.log(response.data.error);
                }
              }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response.data.error + ' - No API available');
              });

        },

        createPath: function(pathId, orgFilterId, dstFilterId, orgWriterId, dstReaderId, midFiltersIds){
            var uri = apiUri + '/createPath',
                message = {
                    'id': pathId, 'orgFilterId': orgFilterId, 'dstFilterId': dstFilterId,
                    'orgWriterId': orgWriterId, 'dstReaderId': dstReaderId, 'midFiltersIds': midFiltersIds
                };

            lmsPaths.push(message);

            $http({
                method: 'POST',
                url: uri,
                data: JSON.stringify(message),
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).then(function succesCallback(response) {
                if (!response.data.error) {
                    console.log(response.data.message);
                } else {
                    console.log(response.data.error);
                }
              }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response.data.error + ' - No API available');
              });
        },

        deletePath: function(pathId){
            var uri = apiUri + '/path/' + pathId;

            $http({
                method: 'DELETE',
                url: uri,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).then(function succesCallback(response) {
                if (!response.data.error) {
                    console.log(response.data.message);
                } else {
                    console.log(response.data.error);
                }
            }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response.data.error + ' - No API available');
            });
        },

        getState: function() {
            var uri = apiUri + '/state';

            $http({
                method: 'GET',
                url: uri,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).then(function succesCallback(response) {
                if (!response.data.error) {
                    console.log(response.data.message);
                } else {
                    console.log(response.data.error);
                }
            }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response.data.error + ' - No API available');
            });
        }
    }
}

angular
    .module('video-wall-app')
    .factory('apiFunctions', apiFunctions);