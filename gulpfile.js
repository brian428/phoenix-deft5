// Required Libraries
var gulp = require( "gulp" ),
    coffee = require( "gulp-coffee" ),
    coffeelint = require( "gulp-coffeelint" ),
    js2coffee = require( "gulp-js2coffee" );
    gutil = require( "gulp-util" );
    
// Config variables
var coffeeAppRoot = "./coffee",    
    jsAppRoot = "./cmd/app";
    
// Error logging    
var errorHandler = function( text ) {
    gutil.log( gutil.colors.cyan( text ) );
};    

// CoffeeScript compile task
gulp.task( "coffee", function() {
  gulp.src( coffeeAppRoot + "/**/*.coffee" )
      .pipe( coffee( { bare: true, sourceMap: false } )
      .on( "error", errorHandler )
      .on( "error", gutil.beep ) )
      .pipe( gulp.dest( jsAppRoot ) );
} );

// CoffeeScript linter task
gulp.task( "lint", function() {
  gulp.src( coffeeAppRoot + "/**/*.coffee" )
    .pipe( coffeelint( { opt: { 
        indentation: { value: 1 },
        no_tabs: { level: "ignore" }, 
        no_trailing_whitespace: { value: true, level: "warn" }, 
        max_line_length: { value: 200, level: "warn" } 
    } } ) )
    .pipe( coffeelint.reporter() );
} );

// Grouped compile and lint task
gulp.task( "compile", [ "lint", "coffee" ] );

// Watch task to continuously compile and lint
gulp.task( "watch", [ "compile" ], function() {
  gulp
    .watch( coffeeAppRoot + "/**/*.coffee", [ "compile" ] );
} );

// Convert JavaScript source into CoffeeScript
gulp.task( "js2coffee", function() {
  gutil.log( jsAppRoot + "/**/*.js" );
  gulp.src( jsAppRoot + "/**/*.js" )
    .pipe( js2coffee().on( "error", errorHandler ) )
    .pipe( gulp.dest( coffeeAppRoot ) )
} );

// Default task
gulp.task( "default", [ "compile" ] );
