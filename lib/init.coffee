path = require 'path'

module.exports =
  config:
    jsonlintExecutablePath:
      type: 'string'
      default: path.join __dirname, '..', 'node_modules', 'jsonlint', 'lib'

  activate: ->
    console.log 'activate linter-jsonlint'
