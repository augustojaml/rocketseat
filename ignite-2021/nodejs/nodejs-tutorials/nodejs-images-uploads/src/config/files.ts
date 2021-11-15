import crypto from 'crypto';
import fs from 'fs';
import multer from 'multer';
import { resolve } from 'path';

const uploadFile = (folder: string): unknown => {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', folder),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      },
    }),
  };
};

const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch {
    // eslint-disable-next-line no-useless-return
    return;
  }
  await fs.promises.unlink(filename);
};

export { uploadFile, deleteFile };
