# json-style-converter
A tiny utility module for converting json objects between various coding styles. This is especially useful in projects which are written in multiple programming languages and use `REST Apis` to comunicate - for example backend in `Ruby`, frontend in `JavaScript`.

[![Build Status](https://travis-ci.org/alexnm/json-style-converter.svg?branch=master)](https://travis-ci.org/alexnm/json-style-converter)

## Install via npm
```javascript
npm i json-style-converter
```

## Example usage
```javascript
const converter = require( "json-style-converter" );

converter.snakeToCamelCase( {
    snake_case: "A simple test",
    camelCase: 42,
    array: [ {
        it_works: true
    }, {
        it_works: null
    } ]
} );

/* returns
{
    snakeCase: "A simple test",
    camelCase: 42,
    array: [ {
        itWorks: true
    }, {
        itWorks: null
    } ]
}*/
```

For using the es5 browser compatible Build
```javascript
const converter = require( "json-style-converter/es5" );
```
or
```javascript
import converter from "json-style-converter/es5";
```

## API
### converter.snakeToCamelCase
Transforms all the keys of object recursively from `snake_case` to `camelCase`.

### converter.camelToSnakeCase
Transforms all the keys of object recursively from `camelCase` to `snake_case`.

--
Ping me on [twitter](https://twitter.com/alexnmoldovan), i'd be more than happy to hear your thoughts!

Alex M
