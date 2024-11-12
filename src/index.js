import fs from 'node:fs/promises';
import path from 'node:path';

import camelCase from 'camelcase';

function defaultLabeler(filename) {
  return camelCase(filename.replace('.js', ''));
}

export default async function folport(folder, {
  labeler = defaultLabeler,
} = { labeler: defaultLabeler }) {
  const files = await fs.readdir(folder);

  const imports = files.map(async (file) => {
    const module = await import(path.join(folder, file));
    const moduleName = labeler(file);
    return { [moduleName]: module };
  });

  const results = await Promise.all(imports);
  return Object.assign({}, ...results);
}
