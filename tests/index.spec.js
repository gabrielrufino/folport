import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { describe, expect, it } from 'vitest';

import folport from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Folport', () => {
  it('Should import the modules', async () => {
    const [
      modules,
      add,
      subtract,
    ] = await Promise.all([
      folport(join(__dirname, 'folder')),
      import('./folder/add'),
      import('./folder/subtract'),
    ]);

    expect(modules).toEqual({
      add,
      subtract,
    });
  });
});
