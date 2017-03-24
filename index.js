function snakeToCamelCase( obj ) {
    if ( typeof obj === "string" ) {
        return snakeToCamel( obj );
    }

    return traverse( obj, snakeToCamel );
}

function camelToSnakeCase( obj, options ) {
    if ( typeof obj === "string" ) {
        return camelToSnake( obj, options );
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

const defaultOptions = {
  numberInUpperCase: false
}

function camelToSnake( str, options = defaultOptions) {
    // Check is options is an object? If no use default settings
    // [] === [object Array]
    // {} === [object Object]
    // 1 === [object Number] etc.
    if(Object.prototype.toString.call({}) !== '[object Object]') {
      options = defaultOptions;
    }

    const config = Object.assign({}, options);

    const { numberInUpperCase } = config;

    if(numberInUpperCase) {
      const pattern = /[a-zA-Z_]+|[0-9]+/g;

      const convertedStrig = convertCamelToSnake(str);
      const splitedString = convertedStrig.match(pattern);

      const result = splitedString.reduce((acc, item, index, arr) => {
        const arrayLength = arr.length - 1;

        if(arrayLength === index) {
          return acc + `${item.toLowerCase()}`
        }

        return acc + `${item.toLowerCase()}_`;
      }, "");

      return result;
    } else {
      const result = convertCamelToSnake(str);

      return result;
    }

}

function convertCamelToSnake(str) {
  const pattern = /[a-z][A-Z]/g;

  const convertedString = str.replace(pattern, letters => {
    const leftOperand = letters[0];
    const rightOperand = letters[1].toLowerCase();
    const result = `${leftOperand}_${rightOperand}`;

    return result ;
  });

  return convertedString;
}
