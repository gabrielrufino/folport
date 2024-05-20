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
  return files.reduce(async (accumulator, current) => ({
    ...(await accumulator),
    [camelCase(current.replace('.js', ''))]: await import(path.join(folder, current)),
  }), {});
}
