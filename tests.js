const converter = require( "./index" );

const snake_obj = {
    snake_case: "A test",
    camelCase: 42,
    array: [ {
        it_works: true
    }, {
        it_works: ""
    } ]
}

console.log( converter.snakeToCamelCase( snake_obj ) );

const camelObj = {
    snake_case: "A test",
    camelCase: 42,
    array: [ {
        itWorks: true
    }, {
        itWorks: ""
    } ]
}

console.log( converter.camelToSnakeCase( camelObj ) );
