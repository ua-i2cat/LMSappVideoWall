'use strict';

angular
    .module('video-wall-app')
    .factory('receiverFunctions', receiverFunctions);

function receiverFunctions($http, $q) {

    var service = {
        setPlay: setPlay
    };

    return service;

    function setPlay(ipReceiver, rtspUri){
        console.log(ipReceiver);
        console.log(rtspUri);
        var uri = 'http://' + ipReceiver + ':8080/api/',
            message = {link: rtspUri};

        return $http({
            method: 'POST',
            url: uri,
            data: JSON.stringify(message),
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(succesCallback, errorCallback);

    }

    function succesCallback(response) {
        var msg;
        if (!response.data.error) {
            msg = {
                'response': response.data.message,
                'state': true
            };
            return msg;
        } else {
            msg = {
                'response': response.data.error,
                'state': false
            };
            return $q.reject(msg);
        }

    }

    function errorCallback() {
        var msg = {
            'response': 'No API available.',
            'state': false
        };
        return $q.reject(msg);
    }
}