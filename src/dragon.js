var Dragon = function(s,t,e,f,c,v,w,x,y,z){
    this.source = document.querySelector(s);
    this.target = t;
    this.elements = e;
    this.effect = f;
    this.class = c;
    this.start = v;
    this.enter = w;
    this.hover = x;
    this.leave = y;
    this.drop = z;
    return this;
};

Dragon.prototype = {
    constructor: Dragon,
    drop:function(e, t){
        e.preventDefault();
        if(isNullOrUndefined(t.drop(e))){
          var id = null, data = e.dataTransfer.getData("text");
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
            o.style = 'position: absolute; left: '+e.clientX+'px; top: '+e.clientY+'px;';
            o.setAttribute('draggable', 'true');
            addEvent(o, 'dragstart', function(r){t.start(r,t);});
            e.target.appendChild(o);
          }
          else {
            document.getElementById(data).style = 'position: absolute; left: '+e.clientX+'px; top: '+e.clientY+'px;';
            id = data;
          }
        }
        else {
          t.drop(e);
        }
    },
    over:function(e, t){
        e.preventDefault();
        e.dataTransfer.dropEffect = t.effect;
        if(!isNullOrUndefined(t.over)){
          t.over(e);
        }
    },
    enter:function(e, t){
        e.preventDefault();
        if(!isNullOrUndefined(t.enter)){
          t.enter(e);
        }
    },
    leave:function(e, t){
        e.preventDefault();
        if(!isNullOrUndefined(t.leave)){
          t.leave(e);
        }
    },
    start:function(e, t){
      if(isNullOrUndefined(t.start)){
        e.preventDefault();
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.effectAllowed = t.effect;
      }
      else {
        t.start(e);
      }
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