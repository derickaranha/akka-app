angular.module("akkaApp", ['ui.bootstrap'])
.controller('AkkaCtrl', ['$scope', function($scope) {


    jsonData = {
        "node": "127.0.0.1:2552",
        "clusterMembers" : [
            "127.0.0.1:2551",
            "127.0.0.1:2552"
        ],
        "clusterServices": [
            {
                "type" : "fix",
                "members": [
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
                "members": ["127.0.0.1:2552"]
            }
        ]

    };

     jsonData2 = {
        "node": "127.0.0.1:2551",
        "clusterMembers" : [
            "127.0.0.1:2551"
        ],
        "clusterServices": [
            {
                "type" : "fix",
                "clusterMember": "127.0.0.1:2551"
            },
            {
                "type" : "mq",
                "clusterMember": "127.0.0.1:2551"
            }
        ]

    };

     jsonData3 = {
        "node": "127.0.0.1:2551",
        "clusterMembers" : [
            "127.0.0.1:2551",
            "127.0.0.1:2552"
        ],
        "clusterServices": [
            {
                "type" : "fix",
                "clusterMember": "127.0.0.1:2552"
            },
            {
                "type" : "mq",
                "clusterMember": "127.0.0.1:2551"
            }
        ]

    };
    $scope.pageData = {
        data: jsonData3
    }

    $scope.startActorSystem = function(){
        alert("Starting Actor System");
    }

    $scope.stopActorSystem = function(){
        alert("Stopping Actor System");
    }

    $scope.refreshData = function(){
        alert("Refreshing Actor Data");
    }

  }])
   .directive("akkaService", function() {
        return {
            restrict: "E",
             scope: {
				akkaShowPanel: '=showPanel',
				akkaServiceType: '=type',
				akkaServiceInfo: '=services',
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
                scope.serviceNode = '';
                scope.showPanel = false;

                for(var i=0; i<scope.akkaServiceInfo.length; i++){
                    if( scope.akkaServiceType == scope.akkaServiceInfo[i].type){
                        scope.showPanel = true;
                        scope.serviceNode = scope.akkaServiceInfo[i].clusterMember;
                        break;
                    }
                }

                scope.showNodeOptions = false;
                if(scope.showPanel){
                    for (var i = 0; i < scope.akkaServiceMembers.length; i++) {
                        if (scope.serviceNode != scope.akkaServiceMembers[i]) {
                            scope.showNodeOptions = true;
                            break;
                        }
                    }

                }
            }
        };
    });

