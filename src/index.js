import fs from 'node:fs/promises';
import path from 'node:path';

import camelCase from 'camelcase';

/**
 * Imports all modules from a folder
 * @param {String} folder
 * @returns {Promise<Object>}
 */
export default async function folport(folder) {
  const files = await fs.readdir(folder);

  const imports = files.map(async (file) => {
    const module = await import(path.join(folder, file));
    const moduleName = camelCase(file.replace('.js', ''));
    return { [moduleName]: module };
  });

  const results = await Promise.all(imports);
  return Object.assign({}, ...results);
}
