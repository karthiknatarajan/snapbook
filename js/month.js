(function() {

    var app, deps;

    app = angular.module('snapbookApp', []);

    app.controller('monthController', function($scope){
        $scope.month_data =  [
                    {
                        label: 'Jan',
                        count : '25',
                        day: [ {
                            label: '01'
                        }
                             ]
                    },
                    {
                        label: 'Feb',
                        count : '32',
                        day:[{
                            label: '01'
                        }
                             ]
                    }
                ];
        
        
        
    });
   
    
    app.directive('monthView',function(){
        return {
            restrict : 'E',
        replace: true,
            template : '<ul class="row"><li class="col-lg-3 col-md-3 col-sm-4 col-xs-5" ng-repeat="month in monthData"><div class="monthDiv"><div class="well well-sm">{{ month.label }}<div class="monthImgDiv"><img src="image/cinqueterre.jpg"class="align-center img-responsive img"><div class="monthImgDetailDiv"><div class="col-sm-10 divtext"><h4>+{{ month.count }} Photos</h4></div></div></div></div></div></li></ul>',
            scope:{
             monthData : '='   
            },
             link: function (scope, element, attrs) {
                 debugger;
                 var on_monthData_change;
                  if (!scope.monthData) {
                        alert('no treeData defined for the tree!');
                        return;
                    }
                 
                 on_monthData_change = function() {
                     debugger;
                        return [scope.monthData];
                    };
 
            scope.$watch('monthData', on_monthData_change, true);
        }
            
        };
    });

//    function monthController($scope) {
//    $scope.data =$scope.data =  [
//                    {
//                        label: 'Jan',
//                        count : '25',
//                        day: [ {
//                            label: '01'
//                        }
//                             ]
//                    },
//                    {
//                        label: 'Feb',
//                        count : '32',
//                        day:[{
//                            label: '01'
//                        }
//                             ]
//                    }
//                ];
//}


}).call(this);
