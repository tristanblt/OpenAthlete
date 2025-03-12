import client, { routes } from '@/utils/axios';

import { CreateAccountDto, User } from '@openathlete/shared';

export class UserService {
  static async createAccount(body: CreateAccountDto): Promise<User> {
    const res = await client.post(routes.user.createAccount, body);
    return res.data;
  }

  static async getMe(): Promise<User> {
    const res = await client.get(routes.user.getMe);
    return res.data;
  }
}
