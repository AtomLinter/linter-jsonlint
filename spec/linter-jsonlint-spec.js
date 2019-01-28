'use babel';

import * as path from 'path';

const goodPath = path.join(__dirname, 'fixtures', 'good.json');
const badPath = path.join(__dirname, 'fixtures', 'bad.json');

describe('The jsonlint provider for Linter', () => {
  const { lint } = require('../lib/index.js').provideLinter();

  beforeEach(() => {
    atom.workspace.destroyActivePaneItem();
    waitsForPromise(() =>
      Promise.all([
        atom.packages.activatePackage('linter-jsonlint'),
        atom.packages.activatePackage('language-json')
      ]));
  });

  describe('checks bad.md and', () => {
    let editor = null;
    beforeEach(() => {
      waitsForPromise(() =>
        atom.workspace.open(badPath).then((openEditor) => {
          editor = openEditor;
        }));
    });

    it('finds at least one message', () => {
      waitsForPromise(() =>
        lint(editor).then(messages => expect(messages.length).toBeGreaterThan(0)));
    });

    it('verifies the first message', () => {
      waitsForPromise(() =>
        lint(editor).then((messages) => {
          expect(messages[0].severity).toEqual('error');
          expect(messages[0].excerpt).toEqual(`Parse error on line 2:
{  "key": 1 + 2}
------------^
Expecting 'EOF', '}', ',', ']', got 'undefined'`);
          expect(messages[0].location.file).toMatch(/.+bad\.json$/);
          expect(messages[0].location.position).toEqual({
            start: { row: 2, column: 0 },
            end: { row: 2, column: 1 }
          });
        }));
    });
  });

  it('finds nothing wrong with a valid file', () => {
    waitsForPromise(() =>
      atom.workspace.open(goodPath).then(editor =>
        lint(editor).then(messages => expect(messages.length).toEqual(0))));
  });
});
