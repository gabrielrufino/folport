import fs from 'node:fs/promises';
import path from 'node:path';

import camelCase from 'camelcase';

/**
 * Imports all modules from a folder
 * @param {String} folder
 * @returns {Promise}
 */
export async function folport(folder) {
  const files = await fs.readdir(folder);
  const modules = {};
  for (const file of files) {
    const moduleName = camelCase(file.replace('.js', ''));
    modules[moduleName] = await import(path.join(folder, file));
  }
  return modules;
}
