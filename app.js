/**
 * @author Koushik Chatterjee <koushikneed@gmail.com>
 */
angular.module('TestHttpWrapperDemo', ['HttpWrapper'])
    .constant("UrlSimulation", {
        ACTUAL: '',
        DATA_LAYER_1: 'mock/',
        DATA_LAYER_2: 'tier1/'
    })
    .run(function(HttpWrapper, UrlSimulation) {
        HttpWrapper.setUrlTransform(function(url) {
        	/* Either use proper Const val to append/prepend or augment in between or else
        	use a single Const for that and build that Const with some logic at begining or 
        	   it can be transform using separate logic depending on business requiremtnt*/
            return UrlSimulation.ACTUAL + url; 
        });
    })
    .controller('MainCtrl', ['$scope', 'HttpWrapper',
        function($scope, HttpWrapper) {

            $scope.loadRemoteData = function() {
                HttpWrapper.post('names.json').then(function(res) {
                    $scope.remoteData = res.data;
                });
            };
        }
    ]);
