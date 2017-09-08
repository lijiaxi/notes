function tap(el,fn){
	var startPoint = {};
	el.addEventListener('touchstart', function(e) {
		startPoint = {
			x: e.changedTouches[0].pageX,
			y: e.changedTouches[0].pageY
		}
	});
	el.addEventListener('touchend', function(e) {
		var nowPoint = {
			x: e.changedTouches[0].pageX,
			y: e.changedTouches[0].pageY
		}
		if(Math.abs(nowPoint.x - startPoint.x) < 5
		&&Math.abs(nowPoint.y - startPoint.y) < 5){
			fn && fn.call(el,e);
		}
	});

}

function css( el, attr, val ){
    var transformAttr = ["rotate","rotateX","rotateY","rotateZ","skewX","skewY","scale","scaleX","scaleY","translateX","translateY","translateZ"];
    transformAttr.forEach( function( atr ){
       if( attr == atr ){
  
            return transform( el, attr, val);
       }
    })
    for( var i = 0; i < transformAttr.length;i++){
        if( attr == transformAttr[i]){
            return transform( el, attr, val);
        }
    }
    if( attr == 'opacity' ){
        el.style[attr] = val;
    }else{
        el.style[attr] = val + 'px';
    }
    if( val === undefined ){
        return getComputedStyle( el )[attr]
    }
    
}

function transform( el, attr, val ){

    if( !el.transform ){
        el.transform = {
            
        }
    }
    if( val === undefined ){

        if( !el.transform[attr] ){
            return 0 ;
        }
        return el.transform[attr]
    }
    el.transform[attr] = val;

    var str = '';
    for( var s in el.transform ){
        switch(s){
			case "rotate":
			case "rotateX":
			case "rotateY":
			case "rotateZ":
			case "skewX":
			case "skewY":
                str += s +"("+el.transform[s]+"deg) ";
				break;
			case "scale":
			case "scaleX":
			case "scaleY":
                str += s +"("+el.transform[s]+") ";
				break;
			case "translateX":
			case "translateY":
			case "translateZ":
                str += s +"("+el.transform[s]+"px) ";
				break;	
        }
        el.style.WebkitTransform = el.style.transform = str;
    }
   
}

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||  
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());