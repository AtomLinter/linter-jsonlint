'use babel';

import { Range } from 'atom';
import * as jsonlint from 'jsonlint';

export default class LinterJsonLint {

  static regex = '.+?line\\s(\\d+)';

  static activate() {
    require('atom-package-deps').install();
  }

  static provideLinter() {
    return {
      grammarScopes: ['source.json'],
      scope: 'file',
      lintOnFly: true,
      lint: editor => {
        const path = editor.getPath();
        const text = editor.getText();

        try {
          jsonlint.parse(text);
        } catch (error) {
          const line = Number(error.message.match(this.regex)[1]);
          const column = 0;

          return Promise.resolve([{
            type: 'Error',
            text: error.message,
            filePath: path,
            range: new Range([line, column], [line, column + 1])
          }]);
        }

        return Promise.resolve([]);
      }
    };
  }
}
