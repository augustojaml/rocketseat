import fs from 'fs';
import { resolve } from 'path';

import { StorageSupport } from '@support/StorageSupport';

import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  public async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(`${StorageSupport.paths.storage}/${folder}`, file),
      resolve(`${StorageSupport.paths.storage}/${folder}`, file),
    );
    return file;
  }

  public async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${StorageSupport.paths.storage}/${folder}`, file);
    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
