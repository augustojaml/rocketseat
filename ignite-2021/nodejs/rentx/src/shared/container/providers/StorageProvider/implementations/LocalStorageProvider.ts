import fs from 'fs';
import { resolve } from 'path';

import { storage } from '@config/storage';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  public async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(resolve(storage.storage, file), resolve(`${storage.storage}/${folder}`, file));
    return file;
  }
  public async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${storage.storage}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      // eslint-disable-next-line no-useless-return
      return;
    }
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
