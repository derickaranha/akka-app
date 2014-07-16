angular.module("myApp", ['ui.bootstrap']);
function AccordionDemoCtrl($scope) {
    jsonData = {
        "myLocation": "montreal",
        "locations" : [
            "montreal",
            "new york"
        ],
        "carDealers": [
            {
                "model" : "bmw",
                "location": "montreal"
            },
            {
                "model" : "honda",
                "location": "new york"
            }
        ]
    };
    $scope.pageData = {
        data: jsonData,
        detailContentModel: 'bmw'
    }
}