( function ( $, $$ ) {
  
  module( "Inject" );
  
  var defaultConfiguration = {
    'first' : function () { return '1!'; },
    'second' : function () { return '2!'; }
  }; // defaultConfiguration
  
  test( "Default Inject Configuration", function () {
    $$.inject( defaultConfiguration, 'default' );
    var obj = $$();
    var first = obj.inject( 'first' );
    var second = obj.inject( 'second' );
    equals( first(), '1!', 'default inject configuration works' );
    equals( second(), '2!', 'default inject configuration works' );
  }); // default inject configuration
  
  test( "Injection In $$", function () {
    var first = $$.inject( 'first' );
    equals( first(), '1!', 'should be able to inject from $$' );
  }); // injection in $$
  
  test( "Injection In Controllers", function () {
    var obj = $$({
      controller : {
        'create' : function () {
          var first = this.inject( 'first' );
          this.model.set( { 'var' : first() } );   
        }
      }
    });
    equals( obj.model.get( 'var' ), '1!', 'this.inject works in controller' );
  }); // injection in controllers
  
  test( "Overriding Inject Configuration", function () {
    $$.inject( { 'second' : function () { return 'overriden'; } } );
    var obj = $$();
    var first = obj.inject( 'first' );
    var second = obj.inject( 'second' );
    equals( first(), '1!', 'non-overriden default injection remains' );
    equals( second(), 'overriden', 'overriding default injection works' );
    
    raises( 
      function () {
        $$.inject( { 'first' : function () { return 'overriden'; } }, 'default' );
      },
      function ( error ) {
        equals( obj.inject( 'first' )(), '1!', 'default injection remains' );
        return error.message === "Cannot override existing default 'first'";
      },
      'throws exception when trying to override an existing default'
    ); // raises
      
    $$.inject( { 'third': function () { return '3!'; } } );
    var third = obj.inject( 'third' );
    equals( third(), '3!', 'injecting non-default should be allowed' );
    
    $$.inject( { 'fourth': function () { return '4!'; } }, 'default' );
    var fourth = obj.inject( 'fourth' );
    equals( fourth(), '4!', 'injecting non-existing default should be allowed' );
    
    $$.inject( { 'fifth': function () { return '5!'; } }, 'default' );
    fourth = obj.inject( 'fourth' );
    var fifth = obj.inject( 'fifth' );
    equals( fourth(), '4!', 'other defaults should still exist' );
    equals( fifth(), '5!', 'new default should exist' );
    
  }); // overriding inject configuration
  
})( jQuery, agility );