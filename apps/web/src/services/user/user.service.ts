import client, { routes } from '@/utils/axios';

import { user } from '@openathlete/database';
import { CreateAccountDto } from '@openathlete/shared';

export class UserService {
  static async createAccount(body: CreateAccountDto): Promise<user> {
    const res = await client.post(routes.user.createAccount, body);
    return res.data;
  }

  static async getMe(): Promise<user> {
    const res = await client.get(routes.user.getMe);
    return res.data;
  }
}
