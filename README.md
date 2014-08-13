linter-jsonlint
=========================

This linter plugin for [Linter](https://github.com/AtomLinter/Linter) provides an interface to [jsonlint](https://github.com/zaach/jsonlint). It will be used with files that have the “JSON” syntax.

## Installation
Linter package must be installed in order to use this plugin. If Linter is not installed, please follow the instructions [here](https://github.com/AtomLinter/Linter).

### jsonlint installation
Before using this plugin, you must ensure that `jsonlint` is installed on your system. To install `jsonlint`, do the following:

1. Install [npm](http://howtonode.org/introduction-to-npm).

2. Install [jsonlint](https://github.com/zaach/jsonlint) by typing the following in a terminal:
   ```
   npm install jsonlint -g
   ```

Now you can proceed to install the linter-jsonlint plugin.

### Plugin installation
```
$ apm install linter-jsonlint
```

## Settings
You can configure linter-json by editing ~/.atom/config.cson (choose Open Your Config in Atom menu):
```
'linter-jsonlint':
  'jsonExecutablePath': null #jsonlint path. run 'which jsonlint' to find the path
```

## Contributing
If you would like to contribute enhancements or fixes, please do the following:

1. Fork the plugin repository.
1. Hack on a separate topic branch created from the latest `master`.
1. Commit and push the topic branch.
1. Make a pull request.
1. welcome to the club

Please note that modications should follow these coding guidelines:

- Indent is 2 spaces.
- Code should pass coffeelint linter.
- Vertical whitespace helps readability, don’t be afraid to use it.

Thank you for helping out!

## Donation
[![Share the love!](https://chewbacco-stuff.s3.amazonaws.com/donate.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KXUYS4ARNHCN8)
