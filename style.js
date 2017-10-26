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
        el.transform = {}
    }
    if( val === undefined ){
        if( !el.transform[attr] ){
            if( attr == 'scale' || attr == 'scaleX' || attr == 'scaleY'){
                return 1 ;
            }
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
};