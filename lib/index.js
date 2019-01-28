'use babel';

// eslint-disable-next-line import/no-extraneous-dependencies, import/extensions
import { Range } from 'atom';
import * as jsonlint from 'jsonlint';

const regex = '.+?line\\s(\\d+)';

export function activate() {
  require('atom-package-deps').install('linter-jsonlint');
}

export function provideLinter() {
  return {
    name: 'JSON Lint',
    grammarScopes: ['source.json'],
    scope: 'file',
    lintsOnChange: true,
    lint: (editor) => {
      const path = editor.getPath();
      const text = editor.getText();

      try {
        jsonlint.parse(text);
      } catch (error) {
        const { message } = error;
        const line = Number(message.match(regex)[1]);
        const column = 0;

        return Promise.resolve([{
          severity: 'error',
          excerpt: message,
          location: {
            file: path,
            position: new Range([line, column], [line, column + 1])
          }
        }]);
      }

      return Promise.resolve([]);
    }
  };
}
