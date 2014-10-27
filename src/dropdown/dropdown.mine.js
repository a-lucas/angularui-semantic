'use strict';

angular.module('angularui-semantic.dropdown', ['angularui-semantic.shared'])

.constant('dropdownConfig', {
  openClass: 'open',
  simpleClass: 'simple',
  selectionClass: 'selection', //display like a select box
  fluidClass: 'fluid', 
  inlineClass: 'inline', 
  floatingClass: 'floating', 
  pointingClass: 'pointing',
  topClass: 'top',
  leftClass: 'left',
  rightClass: 'right'
})

.service('dropdownService', ['$document', function($document) {
  var openScope = null;

  this.open = function( dropdownScope ) {
    if ( !openScope ) {
      $document.bind('click', closeDropdown);
      $document.bind('keydown', escapeKeyBind);
    }

    if ( openScope && openScope !== dropdownScope ) {
        openScope.isOpen = false;
    }

    openScope = dropdownScope;
  };

  this.close = function( dropdownScope ) {
    if ( openScope === dropdownScope ) {
      openScope = null;
      $document.unbind('click', closeDropdown);
      $document.unbind('keydown', escapeKeyBind);
    }
  };

  var closeDropdown = function( evt ) {
    // This method may still be called during the same mouse event that
    // unbound this event handler. So check openScope before proceeding.
    if (!openScope) { return; }

    var toggleElement = openScope.getToggleElement();
    if ( evt && toggleElement && toggleElement[0].contains(evt.target) ) {
        return;
    }

    openScope.$apply(function() {
      openScope.isOpen = false;
    });
  };

  var escapeKeyBind = function( evt ) {
      
    if ( evt.which === keyMap.scape ) {
      openScope.focusToggleElement();
      closeDropdown();
    }
    
  };
  
}])


.controller('DropdownController', ['$scope', '$attrs', '$parse', 'dropdownConfig', 'dropdownService', '$animate', function($scope, $attrs, $parse, dropdownConfig, dropdownService, $animate) {
  var self = this,
      scope = $scope.$new(), // create a child scope so we are not polluting original one
      openClass = dropdownConfig.openClass,
      getIsOpen,
      setIsOpen = angular.noop,
      toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop;
      
      
  this.open = function(){
    //start the open animation
    //watch for click event on item elements
    //on click, do set the ngModel, and trigger  close()
    
  };
  
  this.close = function(){
    //start the close animation
  };
  
  this.toggle = function(open){
      if(arguments.length){
          scope.isOpen = !!open;
      }
      else{
          scope.isopen = !scope.isOpen;
      }      
  };
  
  scope.$watch(scope.isOpen, function(value){      
    if ( !!value === true ) {
        scope.open();
    }
    else{
        scope.close();
    }
  };
  
  
  this.setItem = function(item){
    //update the ngModel
    //update the (title)
    this.close();    
  };
  
  this.setDefault = function(){
    //update the (title)
    //this.updateTitle;
    //add default class
  };
  
  this.updateTitle = function(title){
      
  };
  
  this.init = function(){
    //launch the watch on ngModel to updateTitle on Change    
  };

/*  
title           : string title of the dropdown;
ng-model        : angular model;
transition  : 
    fadein/out  or slidedown/up
},
duration : int ms
on : (default=click)	Event used to trigger dropdown (Hover, Click)
delay : {
    show:  int ms, 
    hide: int ms
},
action: function to execute when clicked.
onShow : 
onChange: 
onHide: 
*/

  

  this.toggle = function( open ) {
    return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

  scope.focusToggleElement = function() {
    if ( self.toggleElement ) {
      self.toggleElement[0].focus();
    }
  };

  scope.$watch('isOpen', function( isOpen, wasOpen ) {
    $animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass);

    if ( isOpen ) {
      scope.focusToggleElement();
      dropdownService.open( scope );
    } else {
      dropdownService.close( scope );
    }

    setIsOpen($scope, isOpen);
    if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
      toggleInvoker($scope, { open: !!isOpen });
    }
  });

  $scope.$on('$locationChangeSuccess', function() {
    scope.isOpen = false;
  });

  $scope.$on('$destroy', function() {
    scope.$destroy();
  });
}])

.directive('dropdown', function() {
  return {
    controller: 'DropdownController',
    replace: true, 
    transclude: true,
    scope: {
        onShow : '=?',
        onChange: '=?',
        onHide: '=?'
    },
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init( element );
    },
    compile: function(elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, tabsetCtrl) {
          
      };
    }
  };
})

.directive('dropdownToggle', function() {
  return {
    require: '?^dropdown',
    
    link: function(scope, element, attrs, dropdownCtrl) {
      if ( !dropdownCtrl ) {
        return;
      }

      dropdownCtrl.toggleElement = element;

      var toggleDropdown = function(event) {
        event.preventDefault();

        if ( !element.hasClass('disabled') && !attrs.disabled ) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      };

      element.bind('click', toggleDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function( isOpen ) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.unbind('click', toggleDropdown);
      });
    }
  };
});




angular.module('angularify.semantic.dropdown', ['ngSanitize'])
    .controller('DropDownController', ['$scope',
        function($scope) {
            $scope.items = [];

            this.add_item = function(scope) {
                $scope.items.push(scope);

                scope.$on('$destroy', function(event) {
                    this.remove_accordion(scope);
                });

                return $scope.items;
            };

            this.remove_item = function(scope) {
                var index = $scope.items.indexOf(scope);
                if (index !== -1)
                    $scope.items.splice(index, 1);
            };

            this.update_title = function(title) {
                var i = 0;
                for (i in $scope.items) {
                    $scope.items[i].title = title;
                }
            };

        }
    ])

.directive('dropdown', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        controller: 'DropDownController',
        scope: {
            title: '@',
            open: '@',
            model: '=ngModel'
        },
        template: '<div class="{{dropdown_class}}">' + '<div class="default text">{{title}}</div>' + '<i class="dropdown icon"></i>' + '<div class="menu" ng-transclude>' + '</div>' + '</div>',
        link: function(scope, element, attrs, DropDownController) {
            scope.dropdown_class = 'ui selection dropdown';

            if (scope.open === 'true') {
                scope.open = true;
                scope.dropdown_class = scope.dropdown_class + ' active visible';
            } else {
                scope.open = false;
            }
            DropDownController.add_item(scope);

            //
            // Watch for title changing
            //
            scope.$watch('title', function(val) {
                if (val === undefined)
                    return;

                if (val === scope.title)
                    return;

                scope.model = val;
            });

            //
            // Watch for ng-model changing
            //
            scope.$watch('model', function(val) {
                // update title
                scope.model = val;
                DropDownController.update_title(val);
            });

            //
            // Click handler
            //
            element.bind('click', function() {

                if (scope.open === false) {
                    scope.open = true;
                    scope.$apply(function() {
                        scope.dropdown_class = 'ui selection dropdown active visible';
                    });
                } else {
                    scope.open = false;
                    scope.model = scope.title
                    scope.$apply(function() {
                        scope.dropdown_class = 'ui selection dropdown';
                    });
                }
            });
        }
    };
})
                        <but

.directive('dropdownGroup', function() {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        require: '^dropdown',
        scope: {
            title: '=title'
        },
        template: '<div class="item" ng-transclude >{{title}}</div>',
        link: function(scope, element, attrs, DropDownController) {

            // Check if title= was set... if not take the contents of the dropdown-group tag
            // title= is for dynamic variables from something like ng-repeat {{variable}}
            var title;
            if (scope.title === undefined) {
                title = scope.title;
            } else {
                title = element.children()[0].innerHTML;
            }

            //
            // Menu item click handler
            //
            element.bind('click', function() {
                DropDownController.update_title(scope.title);
            });
        }
    };
});
