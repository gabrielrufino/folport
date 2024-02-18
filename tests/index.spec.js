import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { folport } from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Folport', () => {
  it('Should import the modules', async () => {
    const result = await folport(join(__dirname, 'folder'));

    expect(result).toEqual({
      add: expect.any(Object),
    });
  });
});
