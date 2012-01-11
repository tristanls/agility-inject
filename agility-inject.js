/*
 * agility-inject.js: Inject plugin for AgilityJS
 *
 * author: Tristan Slominski <tristan.slominski@gmail.com>
 * 
 * (C) 2011-2012 Operational Transparency LLC
 * (C) 2012 Tristan Slominski
 */

( function ( window, undefined ) {
  
  if ( ! window.jQuery ) {
    throw "agility-inject.js: jQuery not found";
  }
  
  if ( ! window.$$ ) {
    throw "agility-inject.js: Agility not found";
  }
  
  // Local reference
  var agility = $$;
  
  if ( agility.adapter.inject ) {
    throw "agility-inject.js: Agility namespace conflict, 'inject' taken";
  }
  
  // ------------------------------------
  //
  // Inject plugin
  //
  // ------------------------------------
  agility.adapter.inject = {
    configuration : {},
    'default' : {}
  };
  
  var _inject = function ( selector ) {
    
    var result = agility.adapter.inject.configuration[ selector ];
    
    if ( typeof result === 'undefined' ) {
      result = agility.adapter.inject[ 'default' ][ selector ];
    }
    
    if ( typeof result === 'undefined' ) {
      throw Error( selector + " is not defined in inject configuration" );
    }
    
    return result;
    
  }; // agility.fn.inject
  
  // Inject configuration
  agility.inject = function ( configuration, option ) {
    
    // allow injecting from $$
    if ( typeof configuration === 'string' ) {
      return _inject( configuration );
    }
  
    if ( option == 'default' ) {
      
      for ( var key in configuration ) {
        if ( ! configuration.hasOwnProperty( key ) ) continue;
        
        if ( agility.adapter.inject[ 'default' ][ key ] )
          throw Error( "Cannot override existing default '" + key + "'" );
        
        agility.adapter.inject[ 'default' ][ key ] = configuration[ key ];
        
      } // for key in configuration
      
    } // default 
    else {
      
      for ( var key in configuration ) {
        if ( ! configuration.hasOwnProperty( key ) ) continue;
        
        agility.adapter.inject.configuration[ key ] = configuration[ key ];
        
      } // for key in configuration

    } // not default
    
    return this;
    
  }; // agility.fn.injectConfig
  
  agility.fn.inject = _inject;
  
})( window );