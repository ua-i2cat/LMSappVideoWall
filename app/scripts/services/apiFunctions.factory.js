'use strict';

function apiFunctions($http) {

    return {
        configureFilter: function(filterId, action, params){
            var okmsg = false,
                uri = apiUri + '/filter/' + filterId,
                message = [{
                    "action": action,
                    "params": params
                }];

            $http({
                method: 'PUT',
                url: uri,
                data: message,
                headers: {'Content-Type': 'application/json'}
            }).then(function succesCallback(response) {
                console.log(response);
                if (!response.error) {
                    console.log("CONFIGURE FILTER");
                    console.log(response.message);
                    okmsg = true;
                } else {
                    console.log(response.error);
                }
              }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response + ' - No API available');
              });

            return okmsg;
        },

        createFilter: function(filterId, type){
            var okmsg = false,
                uri = apiUri + '/createFilter',
                message = {'id': Number(filterId), 'type': type};


            $http({
                method: 'POST',
                url: uri,
                data: message,
                headers: {'Content-Type': 'application/json'}
            }).then(function succesCallback(response) {
                console.log(response);
                if (!response.error) {
                    console.log("CREATE FILTER");
                    console.log(response.message);
                    okmsg = true;
                } else {
                    console.log(response.error);
                }
              }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response + ' - No API available');
              });

            return okmsg;
        },

        createPath: function(pathId, orgFilterId, dstFilterId, orgWriterId, dstReaderId, midFiltersIds){
            var okmsg = false,
                uri = apiUri + '/createPath',
                message = {
                    'id': pathId, 'orgFilterId': orgFilterId, 'dstFilterId': dstFilterId,
                    'orgWriterId': orgWriterId, 'dstReaderId': dstReaderId, 'midFiltersIds': midFiltersIds
                };

            lmsPaths.push(message);

            $http({
                method: 'POST',
                url: uri,
                data: message,
                headers: {'Content-Type': 'application/json'}
            }).then(function succesCallback(response) {
                console.log(response);
                if (!response.error) {
                    console.log("CREATE PATH");
                    console.log(response.message);
                    okmsg = true;
                } else {
                    console.log(response.error);
                }
              }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response + ' - No API available');
              });

            return okmsg;
        },

        deletePath: function(pathId){
            var okmsg = false,
                uri = apiUri + '/path/' + pathId;

            $http({
                method: 'DELETE',
                url: uri,
                headers: {'Content-Type': 'application/json'}
            }).then(function succesCallback(response) {
                console.log(response);
                if (!response.error) {
                    console.log("CREATE PATH");
                    console.log(response.message);
                    okmsg = true;
                } else {
                    console.log(response.error);
                }
            }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response + ' - No API available');
            });

            return okmsg;
        },

        getState: function() {
            var okmsg = false,
                uri = apiUri + '/state';

            $http({
                method: 'GET',
                url: uri,
                headers: {'Content-Type': 'application/json'}
            }).then(function succesCallback(response) {
                console.log(response);
                if (!response.error) {
                    console.log("CREATE PATH");
                    console.log(response.message);
                    okmsg = true;
                } else {
                    console.log(response.error);
                }
            }, function errorCallback(response) {
                console.log('ERROR: \
                            ' + response + ' - No API available');
            });

            return okmsg;
        }
    }
}

angular
    .module('video-wall-app')
    .factory('apiFunctions', apiFunctions);