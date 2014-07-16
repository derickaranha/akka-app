angular.module("akkaApp", ['ui.bootstrap'])
.controller('AccordionDemoCtrl', ['$scope', function($scope) {



    jsonData = {
        "node": "127.0.0.1:2552",
        "clusterMembers" : [
            "127.0.0.1:2551",
            "127.0.0.1:2552"
        ],
        "clusterServices": [
            {
                "type" : "fix",
                "clusterMember": "127.0.0.1:2551"
            },
            {
                "type" : "swift",
                "clusterMember": "127.0.0.1:2552"
            }
        ]

    };
    $scope.pageData = {
        data: jsonData,
        detailContentType: 'fix'
    }
  }])
    .factory("akkaFactory",function($rootScope){

    })
  .directive("akkaService", function() {
        return {
            restrict: "E",
            scope: {
                akkaServiceInfo: '=type',
                akkaServiceMembers: '=members'
            },
            templateUrl: "service-details.html",
            link: function(scope, element, attr) {
                scope.startService = function(serviceType){
                    alert("clicked start Service:" + serviceType);
                }
                scope.stopService = function(serviceType){
                    alert("clicked stop Service:"+serviceType);
                }
                /*for (var i = 0; i < scope.pageData.data.clusterServices.length; i++) {
                    var cService = scope.pageData.data.clusterServices[i];
                    alert(cService.type + attr.type);
                    if (attr.type == cService.type) {
                        scope.akkaServiceType = cService.type.toUpperCase();
                        scope.akkaServiceNode = cService.clusterMember;
                    }
                }*/
            }
        };
    });

