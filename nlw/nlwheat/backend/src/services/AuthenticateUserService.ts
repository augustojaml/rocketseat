import axios from 'axios';
import prismaClient from '../prisma';
import { sign } from 'jsonwebtoken';

interface IGithubResponse {
  access_token: string;
}

interface IGithubUser {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  public async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: githubResponse } = await axios.post<IGithubResponse>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const response = await axios.get<IGithubUser>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${githubResponse.access_token}`,
        },
      }
    );

    const { id, name, login, avatar_url } = response.data;

    let findUser = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!findUser) {
      findUser = await prismaClient.user.create({
        data: {
          github_id: id,
          name: name,
          login: login,
          avatar_url: avatar_url,
        },
      });
    }

    const token = sign(
      {
        user: {
          id: findUser.id,
          name: findUser.name,
          avatar_url: findUser.avatar_url,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: findUser.id,
        expiresIn: '1d',
      }
    );

    return { user: findUser, token };
  }
}
export { AuthenticateUserService };
