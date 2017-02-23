function snakeToCamelCase( obj ) {
    if ( typeof obj === "string" ) {
        return snakeToCamel( obj );
    }

    return traverse( obj, snakeToCamel );
}

function camelToSnakeCase( obj ) {
    if ( typeof obj === "string" ) {
        return camelToSnake( obj );
    }

    return traverse( obj, camelToSnake );
}

module.exports = {
    snakeToCamelCase,
    camelToSnakeCase
};

function traverse( obj, transform ) {
    if ( !obj ) {
        return obj;
    }

    if ( typeof obj !== "object" ) {
        return obj; // must be an object
    }

    if ( isArray( obj ) ) {
        return obj.map( el => traverse( el, transform ) );
    }

    if ( !isSimpleObject( obj ) ) {
        return obj; // avoiding String and other custom objects
    }

    return Object.keys( obj ).reduce( ( acc, key ) => {
        const convertedKey = transform( key );
        acc[ convertedKey ] = traverse( obj[ key ], transform );
        return acc;
    }, { } );
}

function isArray( obj ) {
    return Object.prototype.toString.call( obj ) === "[object Array]";
}

function isSimpleObject( obj ) {
    return Object.prototype.toString.call( obj ) === "[object Object]";
}

function snakeToCamel( str ) {
    return str.replace( /[_-](\w|$)/g, ( match, value ) => value.toUpperCase( ) );
}

function camelToSnake( str ) {
    return str.replace( /[a-z][A-Z]/g, ( letters ) => `${ letters[0] }_${ letters[1].toLowerCase( ) }` );
}
