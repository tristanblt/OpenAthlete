import client, { routes } from '@/utils/axios';

import {
  CreateAccountDto,
  PasswordResetDto,
  PasswordResetRequestDto,
  UpdateAccountDto,
  User,
} from '@openathlete/shared';

export class UserService {
  static async createAccount(body: CreateAccountDto): Promise<User> {
    const res = await client.post(routes.user.createAccount, body);
    return res.data;
  }

  static async updateAccount(body: UpdateAccountDto): Promise<User> {
    const res = await client.patch(routes.user.updateAccount, body);
    return res.data;
  }

  static async getMe(): Promise<User> {
    const res = await client.get(routes.user.getMe);
    return res.data;
  }

  static async passwordResetRequest(
    body: PasswordResetRequestDto,
  ): Promise<void> {
    await client.post(routes.user.passwordResetRequest, body);
  }

  static async passwordReset(body: PasswordResetDto): Promise<void> {
    await client.post(routes.user.passwordReset, body);
  }
}
