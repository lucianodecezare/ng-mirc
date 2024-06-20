import { Injectable, inject } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { IChatMessage } from '../interface';

@Injectable()
export class ChatService {
  private _supaBase!: SupabaseClient;

  constructor() {
    const { supaBaseKey, supaBaseUrl } = environment;

    this._supaBase = createClient(supaBaseUrl, supaBaseKey);
  }

  public async chatMessage(text: string): Promise<void> {
    try {
      const { error } = await this._supaBase.from('chat').insert({ text });

      if (error) {
        throw error.message;
      }
    } catch (error) {
      throw error;
    }
  }

  public async listChat(): Promise<IChatMessage[]> {
    try {
      const { data, error } = await this._supaBase
        .from('chat')
        .select('*, users(*)');

      if (error) {
        throw error.message;
      }

      return data as IChatMessage[];
    } catch (error) {
      throw error;
    }
  }
}
