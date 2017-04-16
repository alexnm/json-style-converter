function snakeToCamelCase( obj ) {
    if ( typeof obj === "string" ) {
        return snakeToCamel( obj );
    }

    return traverse( obj, snakeToCamel );
}

function camelToSnakeCase( obj, options = { } ) {
    if ( !isSimpleObject( options ) ) {
        return obj; // avoiding String and other custom objects
    }

    if ( typeof obj === "string" ) {
        return camelToSnake( obj, options );
    }

    return traverse( obj, camelToSnake, options );
}

module.exports = {
    snakeToCamelCase,
    camelToSnakeCase,
};

function traverse( obj, transform, options ) {
    if ( !obj ) {
        return obj;
    }

    if ( typeof obj !== "object" ) {
        return obj; // must be an object
    }

    if ( isArray( obj ) ) {
        return obj.map( el => traverse( el, transform, options ) );
    }

    if ( !isSimpleObject( obj ) ) {
        return obj; // avoiding String and other custom objects
    }

    return Object.keys( obj ).reduce( ( acc, key ) => {
        const convertedKey = transform( key, options );
        acc[ convertedKey ] = traverse( obj[ key ], transform, options );
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

function camelToSnake( str, { digitsAreUpperCase } ) {
    const firstPass = str.replace( /[a-z][A-Z]/g, ( letters ) => `${ letters[ 0 ] }_${ letters[ 1 ].toLowerCase( ) }` );
    if ( digitsAreUpperCase ) {
        return firstPass.replace( /[0-9]/g, ( digit ) => `_${ digit }` );
    }

    return firstPass;
}
