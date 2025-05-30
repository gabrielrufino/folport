import fs from 'node:fs/promises';
import path from 'node:path';

import camelCase from 'camelcase';

function defaultLabeler(filename) {
  return camelCase(path.parse(filename).name);
}

export default async function folport(folder, {
  labeler = defaultLabeler,
} = { labeler: defaultLabeler }) {
  const files = await fs.readdir(folder);
  const modules = files.filter((file) => file.endsWith('.js'));

  const imports = modules.map(async (file) => {
    const module = await import(path.resolve(folder, file));
    const moduleName = labeler(file);
    return { [moduleName]: module };
  });

  const results = await Promise.all(imports);
  return Object.assign({}, ...results);
}
