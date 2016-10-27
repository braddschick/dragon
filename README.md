# Dragon
    HTML5 Drag and Drop slim (< 5_kb_) library for quick and easy deployment to any web application.

## Usage
Simple and straight forward...
Create the Dragon Object
``` javascript
new Dragon([ID of the source container], [ID of the drop container], 
[HTMLElement that is going to be Dragged], ['copy' or 'move'], null, 
[true to append the container or false to move to specifc spot where dropped]).set();
```
### Example
``` html
<h2>Move the image but don't Append</h2>
<div id="icon_area_move">
    <img id="move" src="https://dummyimage.com/100x100/000/fff.png" />
</div>
<div id="drop1">
</div>
<h2>Copy the image and Append</h2>
<div id="icon_area_copy">
    <img id="copy" src="https://dummyimage.com/100x100/000/fff.png" width="100" height="100" />
</div>
<div id="drop2">
</div>
```

``` javascript
    new Dragon('#icon_area_move','#drop1','img','move').set();
    new Dragon('icon_area_copy','#drop2','img','copy', null, true).set();
```
Oh, and that is it! No really you're done.
You can add the _#_ to the Source and Container ID's if you want. 
You also do not have to add ID's to the draggable objects Dragon will detect if the ID is not there and then insert its own. 

Check the test/index.html file for a working example and decent test harness. 

## How It Works
Simply uses the Drag and Drop API for HTML5 with no need for any additional javascript. 
The **SOURCE** container must have the **HTMLElements** listed inside of it and Dragon will iterate through them to make the objects draggable. 

## Licenses
Well, all the credit for slim libraries must go to [underscore.js](https://underscorejs.org).
Dragon uses a partial collection of functions from the UnderscoreJS library.
All other files and coding follows the BSD 3 Clause Clear licensing model. 