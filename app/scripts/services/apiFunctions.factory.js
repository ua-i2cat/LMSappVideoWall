'use strict';

function apiFunctions($http) {
    var okmsg = false;
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
                console.log(response);
                if (!response.data.error) {
                    console.log("CONFIGURE FILTER");
                    console.log(response.data);
                    okmsg = true;
                } else {
                    console.log(response.data.error);
                }
              }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response.data.error + ' - No API available');
              });

            return okmsg;
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
                console.log(response);
                if (!response.data.error) {
                    console.log("CREATE FILTER");
                    console.log(response.data);
                    okmsg = true;
                } else {
                    console.log(response.data.error);
                }
              }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response.data.error + ' - No API available');
              });

            return okmsg;
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
                console.log(response);
                if (!response.data.error) {
                    console.log("CREATE PATH");
                    console.log(response.data);
                    okmsg = true;
                } else {
                    console.log(response.data.error);
                }
              }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response.data.error + ' - No API available');
              });

            return okmsg;
        },

        deletePath: function(pathId){
            var uri = apiUri + '/path/' + pathId;

            $http({
                method: 'DELETE',
                url: uri,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).then(function succesCallback(response) {
                console.log(response);
                if (!response.data.error) {
                    console.log("CREATE PATH");
                    console.log(response.data);
                    okmsg = true;
                } else {
                    console.log(response.data.error);
                }
            }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response.data.error + ' - No API available');
            });

            return okmsg;
        },

        getState: function() {
            var uri = apiUri + '/state';

            $http({
                method: 'GET',
                url: uri,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).then(function succesCallback(response) {
                console.log(response);
                if (!response.data.error) {
                    console.log("CREATE PATH");
                    console.log(response.data);
                    okmsg = true;
                } else {
                    console.log(response.data.error);
                }
            }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response.data.error + ' - No API available');
            });

            return okmsg;
        }
    }
}

angular
    .module('video-wall-app')
    .factory('apiFunctions', apiFunctions);