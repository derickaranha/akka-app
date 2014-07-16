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
    setTimeout(function(){$scope.setData(jsonData)}, 5000);
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

            scope.showNodeOptions = false;
            scope.toServiceNode = '';
            scope.nodeOptions = scope.akkaServiceMembers;
            scope.startService = function(serviceType) {
                //alert("clicked start Service:" + serviceType +", node: " + scope.toServiceNode +", clusterBean: "+ clusterAdminBean + "--" + scope.toServiceNode);
                if (scope.toServiceNode != '' ) {
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
                   // clusterAdminBean.getClusterConfig(scope.$parent.setData)
                }, 5000);
            };
            scope.filterMembers = function(member) {
                var members = input;
                var keys = 'nodes';
                var serviceType = obj['type'];
                var ids = [];
                Object.keys(obj).filter(function(key){
                    if(keys == key){
                        for(var j=0; j < obj[key].length; j++){
                            Object.keys(obj[key][j]).filter(function(idkey){
                                if("id" == idkey){
                                    var index =  members.indexOf(obj[key][j][idkey]);
                                    if( index > -1){
                                            members = members.splice(index, 1);
                                    }
                                }
                            })
                        }
                    }
                });
                //alert(members);
                return members;
            };

            scope.filterNodes = function(item){
                console.log("Item: "+ item );
            };

            scope.fillNodeOptions = function(){
                for(var i=0; i< scope.akkaServiceInfo.length; i++ ){
                scope.akkaServiceInfo[i].nodes.filter(function(node){
                    var index = scope.akkaServiceMembers.indexOf(node.id);
                    if(index > 1){
                        scope.nodeOptions.splice(index, 1);
                    }
                });
                }
                return scope.nodeOptions;
            };

            scope.filterNodeOptions = function(clusterMember){
                for(var i=0; i< scope.akkaServiceInfo.length; i++ ){
                scope.akkaServiceInfo[i].nodes.filter(function(node){
                    var index = scope.nodeOptions.indexOf(node.id);
                    if(index > 1){
                        scope.nodeOptions.splice(index, 1);
                    }
                });
                }
            };

            scope.$watch(function() { return scope.akkaServiceInfo; }, function() {
                scope.nodeOptions = scope.akkaServiceMembers;
                scope.showNodeOptions = false;
                if (scope.akkaServiceInfo == null) {
                    return;
                }
                scope.fillNodeOptions();
                scope.showNodeOptions = (scope.nodeOptions.length != 0);
                scope.$apply();
//                serviceInfo = (akkaServiceInfo| filter: {type: akkaServiceType})[0]
                /*for (var i = 0; i < scope.akkaServiceInfo.length; i++) {
                    if (scope.akkaServiceType == scope.akkaServiceInfo[i].type) {
                        //?
                        break;
                    }
                }*/

            });
        }
    };
}]);

