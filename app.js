/**
 * @author Koushik Chatterjee <koushikneed@gmail.com>
 */
angular.module('TestHttpWrapperDemo', ['HttpWrapper'])
    .constant("UrlSimulation", {
        ACTUAL: '',
        DATA_LAYER_1: 'dummy/dataset1',
        DATA_LAYER_2: 'dummy/dataset2',
        MOCK: 'mock/'
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

            $scope.loadRemoteNames = function() {
                HttpWrapper.get('names.json').then(function(res) {
                    $scope.remoteNames = res.data;
                });
            };
            $scope.loadRemoteDetail = function() {
                HttpWrapper({url: 'rest/detail'}).then(function(res) {
                    $scope.remoteDetails = res.data;
                });
            };
            $scope.submitData = function() {
                HttpWrapper.post('rest/savedata', $scope.dataFromUI).then(function(res) {
                    $scope.remoteDetails = res.data;
                });
            };
        }
    ]);
