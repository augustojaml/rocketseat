import csvParse from 'csv-parse';
import { Request, Response, Router } from 'express';
import fs from 'fs';
import multer from 'multer';

import { ICreateUserDTO, UsersRepository } from '../repositories/UsersRepository';

const importCSVRoute = Router();

const upload = multer({
  dest: './tmp',
});

async function loadFile(file: Express.Multer.File): Promise<ICreateUserDTO[]> {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file.path);
    const parseFile = csvParse();
    const users: ICreateUserDTO[] = [];
    stream.pipe(parseFile);
    parseFile
      .on('data', async line => {
        const [profile, name] = line;
        users.push({
          profile: profile,
          name: name,
        });
      })
      .on('end', () => {
        resolve(users);
        fs.promises.unlink(file.path);
      })
      .on('error', err => {
        reject(err);
      });
  });
}

importCSVRoute.post('/', upload.single('file'), async (request: Request, response: Response): Promise<Response> => {
  const { file } = request;
  const users: ICreateUserDTO[] = await loadFile(file);
  const userRepository = new UsersRepository();

  users.map(async user => {
    const findUser = await userRepository.findByName(user.name);
    if (!findUser) {
      await userRepository.create({
        profile: user.profile,
        name: user.name,
      });
    }
  });
  return response.json({ message: 'Check you sqlite and confirm importation' });
});

importCSVRoute.get('/', async (request: Request, response: Response): Promise<Response> => {
  const userRepository = new UsersRepository();

  const users = await userRepository.all();

  return response.json(users);
});

export { importCSVRoute };
