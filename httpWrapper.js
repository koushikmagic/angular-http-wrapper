/**
 * @author Koushik Chatterjee <koushikneed@gmail.com>
 */
angular.module('HttpWrapper', [])
    .factory('HttpWrapper', ['$http', function($http) {
        var wrapper = function() {
                if (_urlTransformCallback) {
                    arguments[0].url = _urlTransformCallback(arguments[0].url);
                }
                return actualCallToMonitor($http, this, arguments);
            },
            utilMethodNames = ['get', 'head', 'post', 'put', 'delete', 'jsonp', 'patch'],
            _urlTransformCallback = null,
            actualCallToMonitor = function(callback, objectMonitor, args) {
                return callback.apply(objectMonitor, args);
            };
        wrapper.setUrlTransform = function(urlTransFormCallback) {
            if (angular.isFunction(urlTransFormCallback)) {
                _urlTransformCallback = urlTransFormCallback;
            }
        };
        wrapper.resetUrlTransform = function() {
            _urlTransformCallback = null;
        };
        angular.forEach(utilMethodNames, function(methodName) {
            wrapper[methodName] = function() {
                if (_urlTransformCallback) {
                    arguments[0] = _urlTransformCallback(arguments[0]);
                }
                return actualCallToMonitor($http[methodName], $http, arguments);
            };
        });
        return wrapper;
    }]);
    