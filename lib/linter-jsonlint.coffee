linterPath = atom.packages.getLoadedPackage("linter").path
Linter = require "#{linterPath}/lib/linter"
findFile = require "#{linterPath}/lib/util"

class LinterJsonlint extends Linter
  # The syntax that the linter handles. May be a string or
  # list/tuple of strings. Names should be all lowercase.
  @syntax: 'source.json'

  # A string, list, tuple or callable that returns a string, list or tuple,
  # containing the command line (with arguments) used to lint.
  cmd: 'cli.js -cq'

  linterName: 'jsonlint'

  isNodeExecutable: yes

  errorStream: 'stderr'

  # A regex pattern used to extract information from the executable's output.
  regex:
    '.+?line\\s(?<line>\\d+),\\scol\\s(?<col>\\d+),\\s(?<message>.+)'

  constructor: (editor)->
    super(editor)

    @configSubscription = atom.config.observe 'linter-jsonlint.jsonlintExecutablePath', =>
      @executablePath = atom.config.get 'linter-jsonlint.jsonlintExecutablePath'

  destroy: ->
    super
    @configSubscription.dispose()

module.exports = LinterJsonlint
