var Parser = require('./lib/parser')
var Stringifier = require('./lib/stringifier')

exports.parse = function parse () {
  return new Parser()
}

exports.stringify = function stringify () {
  return new Stringifier()
}
