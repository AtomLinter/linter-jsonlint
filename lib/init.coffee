path = require 'path'

module.exports =
  configDefaults:
    jsonlintExecutablePath: path.join __dirname, '..', 'node_modules', 'jsonlint', 'lib'

  activate: ->
    console.log 'activate linter-jsonlint'
