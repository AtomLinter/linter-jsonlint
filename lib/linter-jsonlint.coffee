{exec, child} = require('child_process')
linterPath = atom.packages.getLoadedPackage("linter").path
Linter = require "#{linterPath}/lib/linter"
findFile = require "#{linterPath}/lib/util"

class LinterJsonlint extends Linter
  # The syntax that the linter handles. May be a string or
  # list/tuple of strings. Names should be all lowercase.
  @syntax: 'source.json'

  # A string, list, tuple or callable that returns a string, list or tuple,
  # containing the command line (with arguments) used to lint.
  cmd: 'jsonlint -cq'

  executablePath: null

  linterName: 'jsonlint'

  # A regex pattern used to extract information from the executable's output.
  regex:
    '.+?line\\s(?<line>\\d+),\\scol\\s(?<col>\\d+),\\s(?<message>.+)'

  constructor: (editor)->
    super(editor)

    atom.config.observe 'linter-jsonlint.jsonlintExecutablePath', =>
      @executablePath = atom.config.get 'linter-jsonlint.jsonlintExecutablePath'

  destroy: ->
    atom.config.unobserve 'linter-jsonlint.jsonlintExecutablePath'
    
  lintFile: (filePath, callback) ->
    command = @executablePath + '/' + @cmd + ' ' + filePath + ' ' + @options

    exec(command, cwd: @cwd, (error, stdout, stderr) => if stderr then @processMessage(stderr, callback))

module.exports = LinterJsonlint
