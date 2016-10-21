var Dragon = function(s,t,e,f,c,a){
  if(s[0] === '#'){
    this.source = document.querySelector(s);
  }
  else {
    this.source = document.querySelector('#'+s);
  }
  if(t[0] === '#'){
    this.target = t;
  }
  else {
    this.target = '#'+t;
  }
  this.target = t;
  this.elements = e;
  this.effect = f;
  this.class = c;
  if(isNullOrUndefined(a)){
    this.append = false;
  }
  else {
    this.append = a;
  }

    return this;
}

Dragon.prototype = {
    constructor: Dragon,
    drop:function(e, t){
      e.preventDefault();
      var id = null, data = e.dataTransfer.getData("text");
      logIt(e);
      // console.info('x: '+e.clientX + ' y:'+e.clientY);
      // console.info('screen x: '+e.screenX+' screen y:'+e.screenY);
      // console.info('page x: '+e.pageX+' page y:'+e.pageY);
      // console.info('offset x: '+e.offsetX+' offset y:'+e.offsetY);
      // console.info('move x: '+e.movementX+' move y:'+e.movementY);
      // console.info('layer x: '+e.layerX+' layer y:'+e.layerY);
        for(var i=0;i<e.target.children.length;i++){
            if(e.target.children[i].id == data){
                document.getElementById(data).style = 'position: absolute; left: '+e.clientX+'px; top: '+e.clientY+'px;';
                addEvent(o, 'dragstart', function(r){t.start(r,t);});
                return true;
            }
        }
        if(t.effect === 'copy'){
          var o = clone(document.getElementById(data));
          id = o.id;
          if(!t.append){
            o.style = 'position: absolute; left: '+e.clientX+'px; top: '+e.clientY+'px;';
          }
          o.setAttribute('draggable', 'true');
          addEvent(o, 'dragstart', function(r){t.start(r,t);});
          e.target.appendChild(o);
        }
        else {
          document.getElementById(data).style = 'position: absolute; left: '+e.clientX+'px; top: '+e.clientY+'px;';
        }
    },
    over:function(e, t){
        e.preventDefault();
        e.dataTransfer.dropEffect = t.effect;
    },
    enter:function(e, t){
      if(!isNullOrUndefined(t.class)){
        // console.info(e.srcElement);
        //   addClass(e.srcElement,t.class);
      }
      e.preventDefault();
    },
    leave:function(e, t){
      if(!isNullOrUndefined(t.class)){
          // removeClass(document.querySelector('#'+e.dataTransfer.getData('text')),t.class);
      }
      e.preventDefault();
    },
    start:function(e, t){
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.effectAllowed = t.effect;
    },
    set:function(){
      var that = this;
      _.each(document.querySelectorAll(this.target),function(e,i,l){
        if(isNullOrUndefined(e.id)){
          e.setAttribute('id',newGuid());
        }
        addEvent(e,'drop',function(e){that.drop(e,that);});
        addEvent(e,'dragover',function(e){that.over(e,that);});
        addEvent(e,'dragenter',function(e){that.enter(e,that);});
        addEvent(e,'dragleave',function(e){that.leave(e,that);});
      });
      var l = document.querySelectorAll('#'+this.source.id+' '+this.elements), el = null;
      for (var i = 0; i < l.length; i++) {
          el = l[i];
          if(isNullOrUndefined(el.id)){
            el.setAttribute('id',newGuid());
          }
          el.setAttribute('draggable', 'true');
          addEvent(el, 'dragstart', function(e){that.start(e,that);});
      }
    },
}
