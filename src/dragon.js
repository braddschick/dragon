var Dragon = function(s,t,e,f,c){
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

    return this;
}

Dragon.prototype = {
    constructor: Dragon,
    drop:function(e, t){
        e.preventDefault();
        var id = null, data = e.dataTransfer.getData("text");
          for(var i=0;i<e.target.children.length;i++){
              if(e.target.children[i].id == data){
                  document.getElementById(data).style = 'position: absolute; left: '+e.clientX+'px; top: '+e.clientY+'px;';
                  addEvent(o, 'dragstart', function(r){t.start(r,t);});
                  jsPlumb.repaintEverything();
                  return true;
              }
          }
          if(t.effect === 'copy'){
            var o = clone(document.getElementById(data));
            id = o.id;
            o.style = 'position: absolute; left: '+e.clientX+'px; top: '+e.clientY+'px;';
            o.setAttribute('draggable', 'true');
            addEvent(o, 'dragstart', function(r){t.start(r,t);});
            addEvent(o, 'click', function(){openUrl(o);});
            e.target.appendChild(o);
          }
          else {
            document.getElementById(data).style = 'position: absolute; left: '+e.clientX+'px; top: '+e.clientY+'px;';
            // id = data;
          }
        // if(!isNullOrUndefined(id)){
        //   jsPlumb.addEndpoint(id, endpointOptions).bind("click", function (component, originalEvent) {
        //       jsPlumb.select(component.connections[0]).detach();
        //   });
        //   if(!isNullOrUndefined(db[data])){
        //     if(!isNullOrUndefined(db[data].business)){
        //       if(!contains(document.getElementById('bizValue').parentElement.innerHTML, db[data].business.head)){
        //         createFromTemplate(document.getElementById('bizValue'),db[data]);
        //       }
        //     }
        //     if(!isNullOrUndefined(db[data].ask)){
        //       if(!contains(document.getElementById('ask').parentElement.innerHTML,db[data].ask)){
        //         createFromTemplate(document.getElementById('ask'),db[data]);
        //       }
        //     }
        //   }          
        // }
    },
    over:function(e, t){
        e.preventDefault();
        e.dataTransfer.dropEffect = t.effect;
    },
    enter:function(e, t){
        e.preventDefault();
    },
    leave:function(e, t){
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