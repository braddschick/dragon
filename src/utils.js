var isNullOrUndefined = function(v){
  if(_.isNull(v)){
    return true;
  }
  else if(_.isUndefined(v)){
    return true;
  }
  else if(_.isEqual('',v.toString().trim())){
    return true;
  }
  else {
    return false;
  }
},
addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

var genID = function(){
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
},
newGuid = function(){
  return (genID() + genID() + "-" + genID() + "-4" + genID().substr(0,3) + "-" + genID() + "-" + genID() + genID() + genID()).toLowerCase();
},
addAttributes = function(el, e){
  _.each(el.attributes, function(o,i,l){
    e.setAttribute(o.name,o.value);
  });
  return e;
},
clone = function(el){
  var e = document.createElement(el.localName);
  e = addAttributes(el,e);
  e.setAttribute('id',newGuid());
  if(!isNullOrUndefined(el.innerHTML)){
    e.innerHTML = el.innerHTML;
  }
  return e;
}
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
var contains = function(o,i){
  return o.indexOf(i) >= 0;
},
findByAttribute = function(o,a){
  var d = document.querySelectorAll(o.localName);
  var t = null;
  if(!isNullOrUndefined(d) && o.getAttribute(a)){
    _.each(d, function(k,v,l){
      if(!isNullOrUndefined(k.getAttribute(a)) && 
        !_.isEqual(k.getAttribute('id'),o.getAttribute('id'))){
        if(_.isEqual(k.getAttribute(a),o.getAttribute(a)) ){
          t = k;
       }
      }
    });
  }
  return t;
},
getObject = function(k,o){
  if(_.isObject(o)){
    var a = [];
    _.each(_.allKeys(o), function(e,i,l){
      if(!_.isObject(o[e])){
        a.push([k+'.'+e,o[e]]);
      }
      else {
        var b = getObject(e, o[e]);
        b[0][0] = e+'.'+b[0][0];
        a.push(b);
      }
    });
    return a;
  }
  else {
    return [k,o.toString()];
  }
},
replaceValues = function(o,a){
  if(_.isArray(a[0])){
    o.innerHTML = o.innerHTML.replace('{{'+a[0][0]+'}}',a[0][1]);
    o.innerHTML = o.innerHTML.replace('{{'+a[1][0]+'}}',a[1][1]);
  }
  else {
    o.innerHTML = o.innerHTML.replace('{{'+a[0]+'}}',a[1]);
  }
  return o;
},
removeByValue = function(i){
  if(!isNullOrUndefined(db[i].ask)){
    var x = document.getElementById('ask');
    _.each(x.parentNode.children,function(k,v,l){
      if(!isNullOrUndefined(k.innerHTML)){
        if(contains(k.innerHTML,db[i].ask)){
          k.remove();
        }
      }
    });
  }
  if(!isNullOrUndefined(db[i].business)){
    var y = document.getElementById('bizValue');
    _.each(y.parentNode.children,function(k,v,l){
      if(!isNullOrUndefined(k.innerHTML)){
        if(contains(k.innerHTML,db[i].business.head)){
          k.remove();
        }
      }
    });
  }
},
createFromTemplate = function(el,d){
  var a = clone(el);
  _.each(_.allKeys(d),function(e,i,l){
    var b = getObject(e,d[e]);
    if(_.isArray(b)){
      a = replaceValues(a,b);
    }
  });
  el.parentNode.appendChild(a);
  return a;
},
logIt = function(obj){
  console.info(obj.constructor.name + ': '+ _.allKeys(obj));
}