import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable()
export class ChatService {
  private supaBase!: SupabaseClient;

  constructor() {
    const { supaBaseKey, supaBaseUrl } = environment;

    this.supaBase = createClient(supaBaseUrl, supaBaseKey);
  }

  public async chatMessage(text: string): Promise<void> {
    try {
      const { error } = await this.supaBase.from('chat').insert({ text });

      if (error) {
        alert(error.message);
      }
    } catch (error) {
      alert(error);
    }
  }
}
