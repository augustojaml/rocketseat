import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const StorageSupport = {
  paths: {
    storage: `./${process.env.APP_LOCAL_STORAGE}`, // APP_LOCAL_STORAGE
  },
  appURL: process.env.APP_STORAGE_PROVIDER === 'local' ? process.env.APP_URL : process.env.AWS_BUCKET_URL,
  upload(folder: string) {
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
  },
};

export { StorageSupport };
