;(function( window ,factory ){
    window.$ = window.v = $ = factory();
})( window,function(){
    // event
    function bindEvent( obj,event,fn){
        obj.addEventListener( event,function( e ){
            fn.call(this, e )         
        },false)
    }
    vQuery.prototype.click = function( fn ){
        this.on('click',fn );
        return this;
    }
    vQuery.prototype.on = function( events, fn ){ 
        var arr = events.split(' ');
        var that = this
        for( var i = 0;i < this.elements.length;i++){
            for( var j = 0 ;j < arr.length;j++){
                bindEvent(this.elements[i], arr[j] ,fn)
            }
        }
        return this;
    }
    vQuery.prototype.tap = function( fn ){
        var el = this.elements[0];
        var isMove = false;
        var startPoint = { }
        el.addEventListener('touchstart', function (e) {
            var ev = e.changedTouches[0];
            startPoint = {
                x : ev.pageX,
                y : ev.pageY
            };
        });
        el.addEventListener('touchmove', function (e) {
            isMove = true;
        });
        el.addEventListener('touchend', function (e) {
            var ev = e.changedTouches[0];
            var nowPoint = {
                x : ev.pageX,
                y : ev.pageY
            }
            if( !isMove && Math.abs( nowPoint.x - startPoint.x ) < 5 && Math.abs( nowPoint.y - startPoint.y ) < 5 ){
                fn && fn.call( el, e )
            }
            isMove = false;
        });
    }
    vQuery.prototype.swiper = function(){
        
    }
    // style
    vQuery.prototype.css = function( attr, val ){
        var transformAttr = ["rotate","rotateX","rotateY","rotateZ","skewX","skewY","scale","scaleX","scaleY","translateX","translateY","translateZ"];
        for (var index = 0; index < transformAttr.length; index++) {
            if( attr == transformAttr[index]){
                for (var i = 0; i < this.elements.length; i++) {
                    return transform( this.elements[i],attr ,val )       
                }
            }        
        }
        if( val === undefined && typeof attr == 'string' ){
            return getComputedStyle(this.elements[0])[ attr ]
        }
        for( var i = 0;i < this.elements.length;i++){
            if( typeof attr == 'object'){
                for( var v in attr ){
                    this.elements[i].style[v] = attr[v]
                }
            }else{
                this.elements[i].style[attr] = val 
            }    
        }
        return this;
    }
    vQuery.prototype.show = function( fn ){
        for( var i = 0;i < this.elements.length;i++){
           var display = this.elements[i].display;
           this.elements[i].style.display = display;
        }
        return this;
    }
    vQuery.prototype.hide = function( fn ){
        for( var i = 0;i < this.elements.length;i++){
            var display = getStyle(this.elements[i],'display');
            this.elements[i].display = display;
            this.elements[i].style.display = 'none'
        }
        return this;
    }
    vQuery.prototype.hover = function( fn1, fn2 ){
        this.on('mouseenter',fn1);
        this.on('mouseleave',fn2);
        return this;
    }

    function getStyle( el, attr ){
        return getComputedStyle( el )[attr]
    }
    function transform( el, attr ,val ){

        if( !el.transform ){
            el.transform = {
            }
        }
        if( val === undefined ){
            if( !el.transform[attr] ){
                return 0
            }
            return el.transform[attr]
        }
        el.transform[attr] = val;
        var str = '';
        for(let s in el.transform ) {        
            switch( s ){
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
        }
        el.style.WebkitTransform = el.style.transform = str;
    }
    // css
    vQuery.prototype.addClass = function( classNames ){
        var regS = /\s+/g;
        var arr = classNames.split( regS );
        for( var i = 0;i < this.elements.length;i++ ){
            for( var j = 0;j < arr.length; j++ ){
                this.elements[i].classList.add( arr[j] )
            }     
         }
        return this;
    }
    vQuery.prototype.removeClass = function( classNames ){
        var regS = /\s+/g;
        var arr = classNames.split( regS );
        for( var i = 0;i < this.elements.length;i++ ){
            for( var j = 0;j < arr.length; j++ ){
                this.elements[i].classList.remove( arr[j] )
            }     
         }
        return this;
    }
    vQuery.prototype.toggleClass = function( classNames ){
        var regS = /\s+/g;
        var arr = classNames.split( regS );
        for( var i = 0;i < this.elements.length;i++ ){
            for( var j = 0;j < arr.length; j++ ){
                this.elements[i].classList.toggle( arr[j] )
            }     
         }
        return this;
    }
    // dom
    vQuery.prototype.html = function( str ){
        if( str === undefined ){
            return this.elements[0].innerHTML
        }
        for( var i = 0;i < this.elements.length;i++){
            this.elements[i].innerHTML = str
        }
        return this;
    }
    vQuery.prototype.attr = function( attr, val  ){
        if( val === undefined && typeof attr == 'string' ){
            return this.elements[0].getAttribute( attr )
        }
        for( var i = 0;i < this.elements.length;i++){
            if( typeof attr == 'object'){
                for( var v in attr ){
                    this.elements[i].setAttribute( v ,attr[v])
                }
            }else{
                this.elements[i].setAttribute( attr ,val )
            }    
        }
        return this;
    }
    vQuery.prototype.eq = function( index ){
        return $(this.elements[index])
    }
    vQuery.prototype.index =  function( ){
        var eles = this.elements[0].parentNode.children;
        for( var i = 0;i < eles.length ;i++){
            if( this.elements[0] == eles[i] ){
                return i
            }
        }
    }
    vQuery.prototype.find = function( sel ){
        var arr = [];
        for( var i = 0;i < this.elements.length;i++ ){
           arr = arr.concat( $.toArray( this.elements[i].querySelectorAll( sel ))) 
        }
        return $( arr )
    }
    vQuery.prototype.parent = function(){   
        return $(this.elements[0].parentNode)
    }
    vQuery.prototype.children = function(){
        return $( $.toArray(this.elements[0].children))
    }
    vQuery.prototype.next = function(){
        return $(this.elements[0].nextElementSibling)
    }
    vQuery.prototype.prev = function(){
        return $(this.elements[0].previousElementSibling)
    }
    vQuery.prototype.siblings = function( el ){
        var arr = [];
        var parent = this.elements[0].parentNode;
        var childs = parent.children;
        for( var i = 0 ; i < childs.length; i++ ){
            if( childs[i] != this.elements[0] ){
                arr.push( childs[i] )
            }
        }
        return $( arr )
    }
    vQuery.prototype.get = function( index ){
        return this.elements[index]
    }
    // 工具方法
    $.extend = function( json ){
        for( var k in json ){
            $[k] = json[k]
        }
    }
    $.trim = function( str ){
        return  str.replace(/^\s+|\s+$/g,'')
    }
    $.toArray = function( arr ){
        return Array.prototype.slice.call( arr )
    }
    $.isArray = function ( arr ){
        return Object.prototype.toString.call( arr ) === '[object Array]'
    }
    // ajax
    $.ajax = function( params ){
        var url = params.url;
        var headers = params.header;
        var type = params.type.toLowerCase() || 'get';
        var async = params.async || true;
        var data = params.data;
        var timeout = params.timeout ;
        return new Promise( function( resolve, reject ){
            var xhr = new XMLHttpRequest();
            if( type === 'get' ){
                url = url + '?' + handleAjaxData( data ) + '&=' + Date.now();
            }
            xhr.open( type, url, async);
            setHeader( xhr )
            if( type === 'post' ){
                xhr.send( handleAjaxData( data ))
            }else{
                xhr.send()
            }  
            xhr.onreadystatechange = function(){
                try {
                    if( xhr.readyState == 4 ){
                        if( timeout && timeout > 0  ){
                            abortTimeout = setTimeout(function(){      
                                xhr.abort();
                                reject('请求超时')
                            }, timeout);
                        }
                        if( xhr.status == 200 ){
                                clearTimeout( abortTimeout )
                                resolve( xhr.responseText )          
                        }
                    } 
                } catch ( e ) {
                    reject( e )
                }
               
            }    
        })
    }
    function setHeader( xhr,headers ){ 
        if( headers === undefined ){
            headers = {
                "Content-Type":'application/x-www-form-urlencoded'
            }
        }
        for( var k in headers ){
            xhr.setRequestHeader( k, headers[k])
        }
    }
    function handleAjaxData( data ){
        var url = ''
        for( var v in data ){
            url += v + '=' + data[v] + '&'
        }
        url =  url.substring( 0 ,url.length - 1  );
        return url
    }
    function vQuery( el ){
        this.elements = [];
        switch( typeof el ){
            case 'function' :
                bindEvent( window,'load', el )
            break;
            case 'string' :
                switch( el.charAt( 0 )){
                    case '#':
                        this.elements.push( document.querySelector( el ))
                    break;
                    case '.':
                    default :
                        this.elements = $.toArray( document.querySelectorAll( el ) )
                    break;
                } 
            break;
            case 'object':
                 
                 if( $.isArray( el ) ){
                     this.elements = this.elements.concat( el )
                 }else{ 
                     this.elements.push( el )
                 }
                 
            break
        }
    }
    function $( el ){
        return new vQuery( el )
    }

    return $
})