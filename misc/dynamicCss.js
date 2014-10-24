//http://www.nganimate.org/angularjs/ng-repeat/move

var addClass =  function( css ) {
    var styleTag = document.getElementsByTagName('style')[0];
    var originalStyles = '';
    if (! styleTag){
        styleTag = document.createElement('style');
        styleTag.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(styleTag);
    } else {
        originalStyles = styleTag.innerHTML;
    }
    styleTag.innerHTML = originalStyles + css;
};

var cssNameCache = [];

var generateEasingTransition = function(  time, direction ){
        
    if(_.indexOf(type+time) !== undefined){
        return true;
    }
        
    var cssText = '.animate-enter'+time+', .animate-leave'+time+
    '{ -webkit-transition: '+time+'ms cubic-bezier(0.420, 0.000, 1.000, 1.000) all;'+
        '-moz-transition: '+time+'ms cubic-bezier(0.420, 0.000, 1.000, 1.000) all;'+
        '-ms-transition: '+time+'ms cubic-bezier(0.420, 0.000, 1.000, 1.000) all;'+
        '-o-transition: '+time+'ms cubic-bezier(0.420, 0.000, 1.000, 1.000) all;'+
        'transition: '+time+'ms cubic-bezier(0.420, 0.000, 1.000, 1.000) all;'+
        'position: relative;'+
        'display: block;} '+
     
    '.animate-enter'+time+'.animate-enter'+time+'-active, '+
    '.animate-leave'+time+' {'+
        'opacity: 1;'+
        'top: 0;'+
        'height: 30px;}'+
             
    '.animate-leave'+time+'.animate-leave'+time+'-active,'+
    '.animate-enter'+time+' {'+
        'opacity: 0;'+
        'top: -50px;'+
        'height: 0px;}';
    
    cssNameCache.push("easing"+time);
    
    addClass(cssText);
    
}
