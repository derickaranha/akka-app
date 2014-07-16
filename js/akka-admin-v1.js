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


function AccordionDemoCtrl($scope) {

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




    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

}

 akkaApp.directive("akkaService", function() {
        return {
            restrict: "E",
            scope: 'isolate',
            //template: "<div>{{exposeAttribute}} {{anotherOne}}</div>",
            controller: AccordionDemoCtrl,
            templateUrl: "../partials/fix-details.html",
            link: function(scope, element, attr) {
                for (var svc in pageData.data.clusterServices) {
                    if (attr.type == svc.type) {
                        scope.akkaService = svc.type;
                        scope.akkaServiceNode = svc.clusterMember;
                    }
                }
            }
        };
    });