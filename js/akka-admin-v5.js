angular.module("akkaApp", ['ui.bootstrap'])
    .controller('AkkaAdminCtrl', ['$scope', function($scope) {

     jsonData = {
        "node": "127.0.0.1:2552",
        "clusterMembers" : [
            "127.0.0.1:2551",
            "127.0.0.1:2552"
        ],
        "clusterServices": [
            {
                "type" : "fix",
                "nodes": [
                    {   "id":"127.0.0.1:2551",
                        "listeners":["CGMDMA","NYFIX"]
                    },
                    {   "id":"127.0.0.1:2552",
                        "listeners":["IPB","ERSTE"]
                    }
                ]
            },
            {
                "type" : "mq",
                "nodes": [
                    {   "id":"127.0.0.1:2552",
                        "listeners":["FUNDS.IN","TRADE.IN"]
                    }
                ]
            }
        ]
    };


      jsonData2 = {
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
                "type" : "mq",
                "clusterMember": "127.0.0.1:2552"
            }
        ]

    };


    $scope.setData = function(serverData) {
        $scope.pageData.data = serverData;
        $scope.userMessageText = '';
        $scope.$apply();
    };
    //clusterAdminBean.getClusterConfig($scope.setData);
    $scope.userMessageText = '';
    $scope.pageData = {
        data: jsonData2
    };
    $scope.showMsg = function() {
        //alert("Action completed");
    };
    $scope.startActorSystem = function() {
        alert("Starting Actor System");
        //clusterAdminBean.startActorSystem($scope.showMsg);
    };
    $scope.stopActorSystem = function() {
        //clusterAdminBean.stopActorSystem($scope.showMsg);
    };
    $scope.refreshData = function() {
        //clusterAdminBean.getClusterConfig($scope.setData);
    };
}]).filter('exclude', function() {
        return function(input, excludeValue) {
            var result = [];
            for (var i = 0; i < input.length; i++) {
                if (input[i] != excludeValue) {
                    result.push(input[i]);
                }
            }
            return result;
        }
    }).directive("akkaService", ['$filter', '$timeout', function($filter, $timeout) {
    return {
        restrict: "E",
        scope: {
            akkaServiceType: '=type',
            akkaServiceInfo: '=services',
            akkaServiceMembers: '=members'
        },
        templateUrl: "service-details.html",
        link: function(scope, element, attr) {
            scope.serviceNode = undefined;
            scope.showPanel = false;
            scope.showNodeOptions = false;
            scope.toServiceNode = '';
            scope.startService = function(serviceType) {
                //alert("clicked start Service:" + serviceType +", node: " + scope.toServiceNode +", clusterBean: "+ clusterAdminBean + "--" + scope.toServiceNode);
                if (scope.toServiceNode != '' && scope.toServiceNode != scope.serviceNode) {
                    //clusterAdminBean.startService(scope.toServiceNode, serviceType, scope.serviceAdminCallback);
                }
            };
            scope.stopService = function(serviceType) {
                //alert("clicked stop Service:" + serviceType +", node: " + scope.serviceNode  +", clusterBean: "+ clusterAdminBean );
                if (scope.serviceNode != '') {
                    //clusterAdminBean.stopService(scope.serviceNode, serviceType, scope.serviceAdminCallback);
                }
            };
            scope.serviceAdminCallback = function(data) {
                scope.$parent.userMessageText = 'Refreshing AKKA data...';
                scope.$apply();
                $timeout(function() {
                   // clusterAdminBean.getClusterConfig(scope.$parent.setData)
                }, 5000);
            };
            scope.$watch(function() { return scope.akkaServiceInfo; }, function() {
                scope.showPanel = false;
                scope.serviceNode = undefined;
                scope.showNodeOptions = false;
                if (scope.akkaServiceInfo == null) {
                    return;
                }
                for (var i = 0; i < scope.akkaServiceInfo.length; i++) {
                    if (scope.akkaServiceType == scope.akkaServiceInfo[i].type) {
                        scope.showPanel = true;
                        scope.serviceNode = scope.akkaServiceInfo[i].clusterMember;
                        break;
                    }
                }
                if (scope.showPanel) {
                    for (var i = 0; i < scope.akkaServiceMembers.length; i++) {
                        if (scope.serviceNode != scope.akkaServiceMembers[i]) {
                            scope.showNodeOptions = true;
                            break;
                        }
                    }
                }
            });
        }
    };
}]);

