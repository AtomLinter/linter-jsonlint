'use babel';

import { Range } from 'atom';
import jsonlint  from 'jsonlint';

export default class LinterJsonLint {

  static activate() {}

  static deactivate() {}

  static regex = '.+?line\\s(\\d+)'

  static provideLinter() {
    return {
      grammarScopes: ['source.json'],
      scope: 'file',
      lintOnFly: true,
      lint: (editor) => {

        let path = editor.getPath();
        let text = editor.getText();

        try {
          jsonlint.parse(text);
        } catch (e) {
          let line = e.message.match(this.regex)[1];
          return [{
            type: 'error',
            text: e.message,
            filePath: path,
            range: new Range([Number(line), 0])
          }];
        }

        return [];
      }
    }
  }

}