//http://www.nganimate.org/angularjs/ng-repeat/move

angular.module("angularui-semantic.shared").service("cssGenerator", function(){

    this.cssNameCache = [];    
    
    var getTransition = function(className, type){
        switch(type){
            case "appear" : 
                return "overflow: hidden;"+
                    "text-overflow: clip;"+
                    "white-space:nowrap;"+
                "} "+
                 
                className+".animate-leave.animate-leave-active,"+
                className".animate-enter {"+
                    "opacity: 0;"+
                    "width: 0px;"+
                    "height: 0px;"+
                "}"+
                 
                className".animate-enter.animate-enter-active, "+
                className".animate-leave {"+
                    "opacity: 1;"+
                    "width: 150px;"+
                    "height: 30px;"+
                "}";
                
            case "move" : 
                return className".animate-enter.animate-enter-active, "+
                className".animate-leave {"+
                    "opacity: 1;"+
                    "top: 0;"+
                    "height: 30px;"+
                "}"+
                 
                className".animate-leave.animate-leave-active,"+
                className".animate-enter {"+
                    "opacity: 0;"+
                    "top: -50px;"+
                    "height: 0px;"+
                "}";
            /*case "scale" : 
                return "}"+  
                    className".animate-leave.animate-leave-active,"+
                    className".animate-enter {"+
                        "-webkit-transform: scaleY(0);"+
                        "-moz-transform: scaleY(0);"+
                        "-ms-transform: scaleY(0);"+
                        "-o-transform: scaleY(0);"+
                        "transform: scaleY(0);"+
                        "height: 0px;"+
                        "opacity: 0;"+
                    "}"+                     
                    className".animate-enter.animate-enter-active,"+
                    className".animate-leave {"+
                        "-webkit-transform: scaleY(1);"+
                        "-moz-transform: scaleY(1);"+
                        "-ms-transform: scaleY(1);"+
                        "-o-transform: scaleY(1);"+
                        "transform: scaleY(1);"+
                        "height: 30px;"+
                        "opacity: 1;"+
                    "}";*/
        }
    };
        
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
    
    this.addTransition = function(  className, transitionType, easing,  time ){
            
        if(_.indexOf(className) !== undefined){
            return true;
        }
        
        var easeOut = "0.000,0.000, 0.580,1.000";
        var easeIn = "0.420,0.000,1.000,1.000";
        var easeInOut = "0.420,0.000,1.580,1.000";
        var easeInQuad = "0.550,0.085,0.680,0.530";
        var easeOutQuad = "0.250,0.460,0.450,0.940";
        
        var ease = "";
        switch(easing){
            case "easeOut" : 
                ease = easeOut;
                break;
            case "easeIn" : 
                ease = easeIn;
                break;
            case "easeInOut" : 
                ease = easeInOut;
                break;
            case "easeInQuad" : 
                ease = easeInQuad
                break;
            case "easeOutQuad" : 
                ease = easeOutQuad;
                break;
            
        }
        
            
        var cssText = className+'.animate-enter'+time+','+className+'.animate-leave'+time+
        '{ -webkit-transition: '+time+'ms cubic-bezier('+ease+') all;'+
            '-moz-transition: '+time+'ms cubic-bezier('+ease+') all;'+
            '-ms-transition: '+time+'ms cubic-bezier('+ease+') all;'+
            '-o-transition: '+time+'ms cubic-bezier('+ease'+) all;'+
            'transition: '+time+'ms cubic-bezier('+ease+') all;'+
            'position: relative;'+
            'display: block; '+
        getTransition(className, transitionType);
        
        this.cssNameCache.push(className);
        
        addClass(cssText);
    
    }

});
