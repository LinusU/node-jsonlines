# JSONLines for Node.js

Parse [JSONLines](http://jsonlines.org) with Node.js.

## Installation

```sh
npm install --save jsonlines
```

## Usage

```javascript
var jsonlines = require('jsonlines')
var parser = jsonlines.parse()

parser.on('data', function (data) {
  console.log('Got json:', data)
})

parser.on('end', function () {
  console.log('No more data')
})

parser.write('{ "test": "This is a test!" }\n')
parser.write('{ "jsonlines": "is awesome" }')
parser.end()
```

```javascript
var jsonlines = require('jsonlines')
var stringifier = jsonlines.stringify()

stringifier.pipe(process.stdout)

stringifier.write({ test: 'This is a test!' })
stringifier.write({ jsonlines: 'is awesome' })
stringifier.end()
```

## API

### `.parse()`

Returns a transform stream that turns newline separated json into a stream of
javascript values.

### `.stringify()`

Returns a transform stream that turns javascript values into a stream of newline
separated json.
