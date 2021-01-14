const assert = require("assert")
const ARGS = {
 help: Boolean,
 "--path_directory": String,
}

const parseArgs = args => {
 return args.reduce(function(obj, arg) {
  arg = arg.split("=")
  var key = arg[0]
  var value = arg[1]
  var Constructor = ARGS[key]
  assert.ok(Constructor, "Unknown argument: " + key)
  key = key.replace(/^--/, "").replace(/-([a-z])/, function(_, value) {
   return value.toUpperCase()
  })
  obj[key] =
   Constructor === Boolean ? true : typeof value !== undefined ? Constructor(value) : undefined
  return obj
 }, {})
}

module.exports = {
 parseArgs,
}
