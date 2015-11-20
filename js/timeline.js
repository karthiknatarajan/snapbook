(function() {

    var app, deps;

    deps = ['angularBootstrapNavTree'];

    if (angular.version.full.indexOf("1.2") >= 0) {
        deps.push('ngAnimate');
    }

    app = angular.module('snapbookApp', deps);

    app.controller('TabController', function(){
        this.tab = 1;

        this.setTab = function(newValue){
            this.tab = newValue;
        };

        this.isSet = function(tabName){
            return this.tab === tabName;
        };
    });

    app.controller('snapbookController', function($scope, $timeout) {
        var apple_selected, tree, treedata_avm, treedata_geography;
        $scope.my_tree_handler = function(branch) {
            var _ref;
            debugger;
            $scope.output = "You selected: " + branch.label;
            $scope.monthdata = branch.month;
        };
        treedata_avm = [
            {
                label: '2014',
                month: [
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
                            label: '02'
                        }
                             ]
                    }
                ]
            },
             {
                label: '2015',
                month: [
                    {
                        label: 'July',
                        count : '50',
                        day: [ {
                            label: '01'
                        }
                             ]
                    },
                    {
                        label: 'August',
                        count : '22',
                        day:[{
                            label: '02'
                        }
                             ]
                    }
                ]
            }
        ];

        $scope.my_data = treedata_avm;
        $scope.try_changing_the_tree_data = function() {
            if ($scope.my_data === treedata_avm) {
                return $scope.my_data = treedata_geography;
            } else {
                return $scope.my_data = treedata_avm;
            }
        };
    });

    var module,
        __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    module = angular.module('angularBootstrapNavTree', []);

    app.directive('timeTree', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                template: "<ul class=\"nav nav-list nav-pills nav-stacked time-tree\">\n  <li ng-repeat=\"row in tree_rows | filter:{visible:true} track by row.branch.uid\" ng-animate=\"'time-tree-animate'\" ng-class=\"'level-' + {{ row.level }} + (row.branch.selected ? ' active':'') + ' ' +row.classes.join(' ')\" class=\"time-tree-row\"><a ng-click=\"user_clicks_branch(row.branch)\"><i ng-class=\"row.tree_icon\" ng-click=\"row.branch.expanded = !row.branch.expanded\" class=\"indented tree-icon\"> </i><span class=\"indented tree-label\">{{ row.label }} </span></a></li>\n</ul>",
                replace: true,
                scope: {
                    treeData: '=',
                    onSelect: '&',
                    initialSelection: '@',
                    treeControl: '='
                },
                link: function(scope, element, attrs) {
                    debugger;
                    var error, expand_level, for_each_branch, on_treeData_change, select_branch, selected_branch, tree;
                    error = function(s) {
                        console.log('ERROR:' + s);
                        return void 0;
                    };

                    if (attrs.iconExpand == null) {
                        attrs.iconExpand = 'glyphicon glyphicon-calendar';
                    }

                    if (attrs.iconCollapse == null) {
                        attrs.iconCollapse = 'glyphicon glyphicon-calendar';
                    }

                    if (attrs.iconLeaf == null) {
                        attrs.iconLeaf = 'icon-file  glyphicon glyphicon-file  fa fa-file';
                    }

                    if (attrs.expandLevel == null) {
                        attrs.expandLevel = '3';
                    }


                    expand_level = parseInt(attrs.expandLevel, 10);

                    if (!scope.treeData) {
                        debugger;
                        alert('no treeData defined for the tree!');
                        return;
                    }

                    if (scope.treeData.length == null) {
                        if (treeData.label != null) {
                            scope.treeData = [treeData];
                        } else {
                            alert('treeData should be an array of root branches');
                            return;
                        }
                    }

                    /*manditory*/
                    for_each_branch = function(f) {
                        var do_f, root_branch, _i, _len, _ref, _results;
                        do_f = function(branch, level) {
                            var child, _i, _len, _ref, _results;
                            f(branch, level);
                            if (branch.month != null || branch.day != null) {
                                branch.month !=null ? _ref = branch.month : _ref = branch.day;

                                _results = [];
                                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                    child = _ref[_i];
                                    _results.push(do_f(child, level + 1));
                                }
                                return _results;
                            }
                        };

                        _ref = scope.treeData;
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            root_branch = _ref[_i];
                            _results.push(do_f(root_branch, 1));
                        }
                        return _results;
                    };

                    selected_branch = null;
                    /*select branch highliged*/
                    select_branch = function(branch) {
                        if (!branch) {
                            if (selected_branch != null) {
                                selected_branch.selected = false;
                            }
                            selected_branch = null;
                            return;
                        }
                        if (branch !== selected_branch) {
                            if (selected_branch != null) {
                                selected_branch.selected = false;
                            }
                            branch.selected = true;
                            selected_branch = branch;
                            if (branch.onSelect != null) {
                                return $timeout(function() {
                                    return branch.onSelect(branch);
                                });
                            } else {
                                if (scope.onSelect != null) {
                                    return $timeout(function() {
                                        return scope.onSelect({
                                            branch: branch
                                        });
                                    });
                                }
                            }
                        }
                    };

                    scope.user_clicks_branch = function(branch) {
                        if(branch.expanded == false)
                            branch.expanded = true;
                        else if ( branch.expanded == true)
                            branch.expanded = false;
                        if (branch !== selected_branch) {
                            return select_branch(branch);
                        }
                    };


                    scope.tree_rows = [];

                    on_treeData_change = function() {
                        var add_branch_to_list, root_branch, _i, _len, _ref, _results;
                        for_each_branch(function(b, level) {
                            if (!b.uid) {
                                return b.uid = "" + Math.random();
                            }
                        });
                        console.log('UIDs are set.');
                        for_each_branch(function(b) {
                            var child, _i, _len, _ref, _results;
                            if (angular.isArray(b.month) || angular.isArray(b.day)) {
                                _ref = angular.isArray(b.month) ?  b.month : b.day;
                                _results = [];
                                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                    child = _ref[_i];
                                    _results.push(child.parent_uid = b.uid);
                                }
                                return _results;
                            }
                        });
                        scope.tree_rows = [];
                        for_each_branch(function(branch) {
                            var child, f;
                            if (branch.month) {
                                if (branch.month.length > 0) {
                                    f = function(e) {
                                        if (typeof e === 'string') {
                                            return {
                                                label: e,
                                                month: []
                                            };
                                        } else {
                                            return e;
                                        }
                                    };
                                    return branch.month = (function() {
                                        var _i, _len, _ref, _results;
                                        _ref = branch.month;
                                        _results = [];
                                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                            child = _ref[_i];
                                            _results.push(f(child));
                                        }
                                        return _results;
                                    })();
                                }
                            } else {
                                return branch.month = [];
                            }

                            if (branch.day) {
                                if (branch.day.length > 0) {
                                    f = function(e) {
                                        if (typeof e === 'string') {
                                            return {
                                                label: e,
                                                day: []
                                            };
                                        } else {
                                            return e;
                                        }
                                    };
                                    return branch.day = (function() {
                                        var _i, _len, _ref, _results;
                                        _ref = branch.day;
                                        _results = [];
                                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                            child = _ref[_i];
                                            _results.push(f(child));
                                        }
                                        return _results;
                                    })();
                                }
                            } else {
                                return branch.day = [];
                            }
                        });
                        add_branch_to_list = function(level, branch, visible) {
                            var child, child_visible, tree_icon, _i, _len, _ref, _results;
                            if (branch.expanded == null) {
                                branch.expanded = false;
                            }
                            if (branch.classes == null) {
                                branch.classes = [];
                            }
                            if (!branch.noLeaf && (!branch.month || branch.month.length === 0)) {
                                tree_icon = attrs.iconLeaf;
                                if (__indexOf.call(branch.classes, "leaf") < 0) {
                                    branch.classes.push("leaf");
                                }
                            } else {
                                if (branch.expanded) {
                                    tree_icon = attrs.iconCollapse;
                                } else {
                                    tree_icon = attrs.iconExpand;
                                }
                            }
                            scope.tree_rows.push({
                                level: level,
                                branch: branch,
                                label: branch.label,
                                classes: branch.classes,
                                tree_icon: tree_icon,
                                visible: visible
                            });
                            if (branch.month != null || branch.day !=null) {
                                _ref = branch.month.length!=0 ? branch.month : branch.day;
                                _results = [];
                                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                    child = _ref[_i];
                                    child_visible = visible && branch.expanded;
                                    _results.push(add_branch_to_list(level + 1, child, child_visible));
                                }
                                return _results;
                            }

                        };
                        _ref = scope.treeData;
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            root_branch = _ref[_i];
                            _results.push(add_branch_to_list(1, root_branch, true));
                        }
                        debugger;
                        return _results;
                    };

                    scope.$watch('treeData', on_treeData_change, true);

                }
            };
        }
    ]);

    
    
    app.directive('monthView',[
        '$timeout',function($timeout){
        return {
            restrict : 'E',
        replace: true,
            template : '<ul class="row"><li class="col-lg-3 col-md-3 col-sm-4 col-xs-4" ng-repeat="month in monthData"><div class="monthDiv"><div class="well well-sm">{{ month.label }}<div class="monthImgDiv"><img src="image/cinqueterre.jpg" class="align-center img-responsive img"><div class="monthImgDetailDiv"><div class="col-sm-10 divtext"><h4>+{{ month.count }} Photos</h4></div></div></div></div></div></li></ul>',
            scope:{
             monthData : '='   
            },
             link: function (scope, element, attrs) {
                 debugger;
                 var on_monthData_change;
                 
                 on_monthData_change = function() {
                     debugger;
                        return [scope.monthData];
                    };
 
            scope.$watch('monthData', on_monthData_change, true);
        }
            
        };
    }
    ]);

    
}).call(this);
