'use babel';

import * as path from 'path';

describe('The jsonlint provider for Linter', () => {
  const lint = require(path.join('..', 'lib', 'index.js')).provideLinter().lint;

  beforeEach(() => {
    atom.workspace.destroyActivePaneItem();
    waitsForPromise(() => {
      atom.packages.activatePackage('linter-jsonlint');
      return atom.packages.activatePackage('language-json').then(() =>
        atom.workspace.open(path.join(__dirname, 'fixtures', 'good.json'))
      );
    });
  });

  describe('checks bad.md and', () => {
    let editor = null;
    beforeEach(() => {
      waitsForPromise(() => {
        const bad = path.join(__dirname, 'fixtures', 'bad.json');
        return atom.workspace.open(bad).then(openEditor => {
          editor = openEditor;
        });
      });
    });

    it('finds at least one message', () => {
      waitsForPromise(() => {
        return lint(editor).then(messages => {
          expect(messages.length).toBeGreaterThan(0);
        });
      });
    });

    it('verifies the first message', () => {
      waitsForPromise(() => {
        return lint(editor).then(messages => {
          expect(messages[0].type).toEqual('Error');
          expect(messages[0].text).toEqual(`Parse error on line 2:
{  "key": 1 + 2}
------------^
Expecting 'EOF', '}', ',', ']', got 'undefined'`);
          expect(messages[0].filePath).toMatch(/.+bad\.json$/);
          expect(messages[0].range).toEqual({
            start: { row: 2, column: 0 },
            end: { row: 2, column: 1 }
          });
        });
      });
    });
  });

  it('finds nothing wrong with a valid file', () => {
    waitsForPromise(() => {
      const good = path.join(__dirname, 'fixtures', 'good.json');
      return atom.workspace.open(good).then(editor => {
        return lint(editor).then(messages => {
          expect(messages.length).toEqual(0);
        });
      });
    });
  });
});
