linterPath = atom.packages.getLoadedPackage("linter").path
Linter = require "#{linterPath}/lib/linter"
findFile = require "#{linterPath}/lib/util"

class LinterJson extends Linter
  # The syntax that the linter handles. May be a string or
  # list/tuple of strings. Names should be all lowercase.
  @syntax: 'source.json'

  # A string, list, tuple or callable that returns a string, list or tuple,
  # containing the command line (with arguments) used to lint.
  cmd: 'jsonlint -cq 2>&1'

  executablePath: null

  linterName: 'json'

  # A regex pattern used to extract information from the executable's output.
  regex:
    '.+?line\\s(?<line>\\d+),\\scol\\s(?<col>\\d+),\\s(?<message>.+)'

  constructor: (editor)->
    super(editor)

    atom.config.observe 'linter-json.jsonExecutablePath', =>
      @executablePath = atom.config.get 'linter-json.jsonExecutablePath'

  destroy: ->
    atom.config.unobserve 'linter-json.jsonExecutablePath'

module.exports = LinterJson
