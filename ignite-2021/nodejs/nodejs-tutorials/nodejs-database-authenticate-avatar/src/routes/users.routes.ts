import { compare, hash } from 'bcrypt';
import { Request, Response, Router } from 'express';
import { sign } from 'jsonwebtoken';
import multer from 'multer';

import { AppError } from '../errors/AppError';
import { ensureIsAuthenticated } from '../middleware/ensureIsAuthenticated';
import { UsersRepository } from '../repositories/UsersRepository';
import { deleteFile, uploadFile } from '../utils/files';
import { security } from '../utils/security';

const usersRoutes = Router();

usersRoutes.post('/', async (request: Request, response: Response): Promise<Response> => {
  const { name, email, password } = request.body;
  const usersRepository = new UsersRepository();
  const findUser = await usersRepository.findByEmail(email);
  if (findUser) {
    throw new AppError('User already exists');
  }

  const hashPassword = await hash(password, 8);

  const user = await usersRepository.create({ name, email, password: hashPassword });
  return response.json({ user });
});

usersRoutes.post('/authenticate', async (request: Request, response: Response): Promise<Response> => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();

  // CHECK IF USER EXISTS
  const findUser = await usersRepository.findByEmail(email);
  if (!findUser) {
    throw new AppError('Email or password incorrect');
  }

  // COMPARE (TEXT, ENCRYPTED)
  const comparePassword = await compare(password, findUser.password);
  if (!comparePassword) {
    throw new AppError('Email or password incorrect');
  }

  const token = sign({}, security.hash, {
    subject: findUser.id,
    expiresIn: security.expireIn,
  });

  const responseReturn = {
    user: {
      name: findUser.name,
      email: findUser.email,
    },
    token: token,
  };

  return response.json(responseReturn);
});

usersRoutes.get('/', ensureIsAuthenticated, async (request: Request, response: Response): Promise<Response> => {
  const usersRepository = new UsersRepository();
  const users = await usersRepository.all();
  return response.json({ users });
});

/**
 * UPLOAD
 */
const storage = 'temp/avatar';
const upload = multer(uploadFile(storage));

usersRoutes.patch(
  '/avatar',
  ensureIsAuthenticated,
  upload.single('avatar'),
  async (request: Request, response: Response): Promise<Response> => {
    const { id: user_id } = request.user;
    const avatar_file = request.file.filename;
    const usersRepository = new UsersRepository();
    const findUser = await usersRepository.findById(user_id);
    if (findUser) {
      await deleteFile(`${storage}/${findUser.avatar}`);
    }

    findUser.avatar = avatar_file;
    await usersRepository.update(findUser);

    return response.send();
  },
);

export { usersRoutes };
