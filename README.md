linter-jsonlint
=========================

This [Linter](https://github.com/AtomLinter/Linter) plugin provides an interface to [jsonlint](https://github.com/zaach/jsonlint). It will be used with files that have the “JSON” syntax.

## Installation

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
