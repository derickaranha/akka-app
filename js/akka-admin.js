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
                        "listeners":["CGMDMA","NYFIX","SNS-CROSSBDX","Reuters42","ReutersFund","GXS-UAT","Intermonte","NYFIXINTL"]
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
    $scope.setData = function(serverData) {
        $scope.pageData.data = serverData;
        $scope.userMessageText = '';
        $scope.$apply();
    };
    //clusterAdminBean.getClusterConfig($scope.setData);
    $scope.userMessageText = '';
    $scope.pageData = {
        data: {}
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
    setTImeout($scope.setData(jsonData), 5000);
}]).filter('exclude', function(){
        return function(input, obj) {
            var members = input.slice(0,input.length);
            var keys = 'nodes';
            var ids = [];
            for(var i=0; i < obj.length; i++ ){
                Object.keys(obj[i]).filter(function(key){
                    if("id" == key){
                        var index =  members.indexOf(obj[i][key]);
                        if( index > -1){
                            members.splice(index, 1);
                        }
                    }
                })
            }
            if(members.length == 0) this.showNodeOptions = false;
            return members;
        }
    }
).directive("akkaService", ['$filter', '$timeout', function($filter, $timeout) {
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
                if (scope.toServiceNode != '') {
                    //clusterAdminBean.startService(scope.toServiceNode, serviceType, scope.serviceAdminCallback);
                }
            };
            scope.stopService = function(serviceType, nodeId) {
                alert('Stopping Service: '+ serviceType +', Id: '+ nodeId);
                //alert("clicked stop Service:" + serviceType +", node: " + scope.serviceNode  +", clusterBean: "+ clusterAdminBean );
                if (nodeId != '') {
                    //clusterAdminBean.stopService(nodeId, serviceType, scope.serviceAdminCallback);
                }
            };
            scope.serviceAdminCallback = function(data) {
                scope.$parent.userMessageText = 'Refreshing AKKA data...';
                scope.$apply();
                $timeout(function() {
                    //clusterAdminBean.getClusterConfig(scope.$parent.setData)
                }, 5000);
            };

            scope.filterNodes = function(item, node){
                console.log("Item: "+ item +", Node: "+ node);
            };

            scope.$watch(function() { return scope.akkaServiceInfo; }, function() {
                scope.showPanel = false;

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

                }
            });
        }
    };
}]);

