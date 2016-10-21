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