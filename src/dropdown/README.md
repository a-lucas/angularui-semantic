How to use : 


Usage

<dropdown title="my dropdown" ng-model="dropdown_model" open="true">
    <dropdown-group>item1</dropdown-group>
    <dropdown-group>item2</dropdown-group>
    <dropdown-group>item3</dropdown-group>
    <dropdown-group>item4</dropdown-group>
</dropdown>

or

<dropdown title="my dropdown" ng-model="category_model">
    <dropdown-group title="c" ng-repeat="c in catetories">{{c}}</dropdown-group>
</dropdown>

**dropdown**

can have following attributes:

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


cssSelector : {
  input : '> input[type="hidden"]',
  item  : '.menu > .item',
  menu  : '.menu',
  text  : '> .text'
}


-> restrict on className only

