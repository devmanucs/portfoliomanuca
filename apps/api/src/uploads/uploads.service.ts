import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadsService {
  private client: SupabaseClient | null = null;

  private getClient(): SupabaseClient {
    if (this.client) return this.client;

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new InternalServerErrorException(
        'Upload não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env da API (veja o README).',
      );
    }

    this.client = createClient(url, key);
    return this.client;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const client = this.getClient();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? 'portfolio-media';
    const extension = file.originalname.includes('.')
      ? file.originalname.split('.').pop()
      : undefined;
    const path = `${randomUUID()}${extension ? `.${extension}` : ''}`;

    const { error } = await client.storage.from(bucket).upload(path, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

    if (error) {
      throw new InternalServerErrorException(`Falha ao enviar arquivo: ${error.message}`);
    }

    const { data } = client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
