(function() {

    var app, deps;

    app = angular.module('snapbookApp', []);

    app.controller('dayController', function($scope){
        $scope.day_data =  [ {
                            label: 'September 01',
                            images : [
                                {
                                    src : "image/cinqueterre.jpg"
                                },
                                {
                                    src : "image/cinqueterre.jpg"
                                },
                                {
                                    src : "image/cinqueterre.jpg"
                                },
                                {
                                    src : "image/cinqueterre.jpg"
                                },
                                {
                                    src : "image/cinqueterre.jpg"
                                }
                                ,
                                {
                                    src : "image/cinqueterre.jpg"
                                }
                            ]
                        },
                         {
                             label: 'October 01',
                             images : [
                                 {
                                     src : "image/cinqueterre.jpg"
                                 }
                             ]
                         }
                             ];
    });
   
    
    app.directive('dayView',function(){
        return {
            restrict : 'E',
            replace: true,
            template : '<div class="panel panel-default" ng-repeat="days in dayData"><div class="panel-body">{{days.label}}<ul class="row"><li class="col-lg-2 col-md-2 col-sm-3 col-xs-4" ng-repeat="image in days.images"><img ng-src={{image.src}} class="align-center img-responsive img"></li></ul></div></div>',
            scope:{
             dayData : '='   
            },
             link: function (scope, element, attrs) {
                 debugger;
                 var on_dayData_change;
                  if (!scope.dayData) {
                        alert('no treeData defined for the tree!');
                        return;
                    }
                 
                 on_dayData_change = function() {
                     debugger;
                        return [scope.dayData];
                    };
 
            scope.$watch('dayData', on_dayData_change, true);
        }
            
        };
    });




}).call(this);
