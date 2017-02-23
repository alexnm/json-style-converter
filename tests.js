const converter = require( "./index" );

const snake_obj = Object.freeze( {
    snake_case: "A simple test",
    camelCase: 42,
    array: [ {
        it_works: true
    }, {
        it_works: null
    } ]
} );

const camelObj = Object.freeze( {
    snake_case: "A simple test",
    camelCase: 42,
    array: [ {
        itWorks: true
    }, {
        itWorks: null
    } ]
} );

// A new object is created
console.assert( snake_obj !== converter.snakeToCamelCase( snake_obj ) );

// Edge cases
console.assert( JSON.stringify( { } ) === JSON.stringify( converter.snakeToCamelCase( { } ) ) );
console.assert( converter.snakeToCamelCase( null ) === null );
console.assert( converter.snakeToCamelCase( 42 ) === 42 );
console.assert( converter.snakeToCamelCase( "42" ) === "42" );
console.assert( converter.snakeToCamelCase( ) === undefined );
console.assert( converter.camelToSnakeCase( "Edgecase" ) === "Edgecase" );
console.assert( converter.camelToSnakeCase( "Edge.Case" ) === "Edge.Case" );

// Test with object
let result = converter.snakeToCamelCase( snake_obj );
console.assert( result.snakeCase === "A simple test" );
console.assert( result.camelCase === 42 );
console.assert( result.array[ 0 ].itWorks === true );
console.assert( result.array[ 1 ].itWorks === null );

// Test with array
result = converter.snakeToCamelCase( [ snake_obj, snake_obj, snake_obj ] );
console.assert( result.length === 3 );
console.assert( result[ 0 ].snakeCase === "A simple test" );
console.assert( result[ 0 ].camelCase === 42 );
console.assert( result[ 0 ].array[ 0 ].itWorks === true );
console.assert( result[ 0 ].array[ 1 ].itWorks === null );


// A new object is created
console.assert( camelObj !== converter.camelToSnakeCase( camelObj ) );

// Edge cases
console.assert( JSON.stringify( { } ) === JSON.stringify( converter.camelToSnakeCase( { } ) ) );
console.assert( converter.camelToSnakeCase( null ) === null );
console.assert( converter.camelToSnakeCase( 42 ) === 42 );
console.assert( converter.camelToSnakeCase( "42" ) === "42" );
console.assert( converter.camelToSnakeCase( ) === undefined );
console.assert( converter.camelToSnakeCase( "Edgecase" ) === "Edgecase" );
console.assert( converter.camelToSnakeCase( "Edge.Case" ) === "Edge.Case" );

// Test with object
result = converter.camelToSnakeCase( camelObj );
console.assert( result.snake_case === "A simple test" );
console.assert( result.camel_case === 42 );
console.assert( result.array[ 0 ].it_works === true );
console.assert( result.array[ 1 ].it_works === null );

// Test with array
result = converter.camelToSnakeCase( [ camelObj, camelObj, camelObj ] );
console.assert( result.length === 3 );
console.assert( result[ 0 ].snake_case === "A simple test" );
console.assert( result[ 0 ].camel_case === 42 );
console.assert( result[ 0 ].array[ 0 ].it_works === true );
console.assert( result[ 0 ].array[ 1 ].it_works === null );