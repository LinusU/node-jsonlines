var Transform = require('stream').Transform

function Parser () {
  if (!(this instanceof Parser)) {
    throw new TypeError('Cannot call a class as a function')
  }

  Transform.call(this, { objectMode: true })
  this._memory = ''
}

Parser.prototype = Object.create(Transform.prototype)

Parser.prototype._handleLines = function (lines, cb) {
  for (var i = 0; i < lines.length; i++) {
    if (lines[i] === '') continue

    var json
    try {
      json = JSON.parse(lines[i])
    } catch (err) {
      err.source = lines[i]
      return cb(err)
    }

    this.push(json)
  }

  cb(null)
}

Parser.prototype._transform = function (chunk, encoding, cb) {
  var lines = (this._memory + chunk.toString()).split('\n')

  this._memory = lines.pop()
  this._handleLines(lines, cb)
}

Parser.prototype._flush = function (cb) {
  if (!this._memory) return cb(null)

  var line = this._memory

  this._memory = ''
  this._handleLines([ line ], cb)
}

module.exports = Parser
