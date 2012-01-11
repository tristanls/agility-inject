# Agility-Inject

A light-weight plugin to handle dependency injection in [Agility.js](http://agility.js)

### Usage

```html
<script type="text/javascript" src="agility.js"></script>
<script type="text/javascript" src="agility-inject.js"></script>
```

```javascript
var objTypeOne = $$({
  model : {},
  view : {
    format: '<div>obj one</div>'	
  }
});

// agility-inject provides a global namespace to store objects
// 'default' option sets whatever the default object for the string 'obj'
// should be. it can only be set once
$$.inject( { 'obj' : objTypeOne }, 'default' );

// later it is possible to override the default by skipping 'default' option
$$.inject( { 'obj' : objTypeOne } );

var objTypeTwo = $$({
  view : {
    format: '<div id="container"></div>'	 
  },
  controller : {
    'click &': function () {
	  // we can inject using the 'inject' method provided by the plugin
	  var objOnePrototype = this.inject( 'obj' );

      var objOne = $$( objOnePrototype );
      self.append( objOne );
    }	
  }
});

// we can also inject using the global
var objOnePrototype = $$.inject( 'obj' );
```