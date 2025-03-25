import client, { routes } from '@/utils/axios';

export class ConnectorService {
  static async getOAuthUri(provider: string): Promise<string> {
    const res = await client.get(routes.connector.getOAuthUri(provider));
    return res.data;
  }

  static async setOAuthToken({
    provider,
    code,
  }: {
    provider: string;
    code: string;
  }): Promise<void> {
    await client.post(routes.connector.setOAuthToken(provider), { code });
  }
}
