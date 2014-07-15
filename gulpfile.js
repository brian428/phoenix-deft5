var gulp = require( 'gulp' ),
    coffee = require( 'gulp-coffee' ),
    coffeelint = require( 'gulp-coffeelint' ),
    js2coffee = require( 'gulp-js2coffee' );
    gutil = require( 'gulp-util' );
    
var jsAppRoot = './cmd/app';
var coffeeAppRoot = './coffee';    

var errorHandler = function( text ) {
    gutil.log( gutil.colors.cyan( text ) );
};    
    
gulp.task( 'coffee', function() {
  gulp.src( coffeeAppRoot + '/**/*.coffee' )
      .pipe( coffee( { bare: true, sourceMap: false } )
      .on( 'error', errorHandler )
      .on( 'error', gutil.beep ) )
      .pipe( gulp.dest( jsAppRoot ) );
} );

gulp.task( 'lint', function() {
  gulp.src( coffeeAppRoot + '/**/*.coffee' )
    .pipe( coffeelint( { opt: { 
        indentation: { value: 1 },
        no_tabs: { level: "ignore" }, 
        no_trailing_whitespace: { value: true, level: "warn" }, 
        max_line_length: { value: 200, level: "warn" } 
    } } ) )
    .pipe( coffeelint.reporter() );
} );

gulp.task( 'scripts', [ 'lint', 'coffee' ] );
//gulp.task( 'scripts', [ 'coffee' ] );

gulp.task( 'default', [ 'scripts' ] );

gulp.task( 'watch', [ 'scripts' ], function() {
  gulp
    .watch( coffeeAppRoot + '/**/*.coffee', [ 'scripts' ] );
} );

gulp.task( 'js2coffee', function() {
  gutil.log( jsAppRoot + '/**/*.js' );
  gulp.src( jsAppRoot + '/**/*.js' )
    .pipe( js2coffee().on( 'error', errorHandler ) )
    .pipe( gulp.dest( coffeeAppRoot ) )
} );
