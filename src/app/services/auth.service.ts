import { Injectable } from '@angular/core';
import { Provider, SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supaBase!: SupabaseClient;

  constructor() {
    const { supaBaseKey, supaBaseUrl } = environment;

    this.supaBase = createClient(supaBaseUrl, supaBaseKey);

    this.supaBase.auth.onAuthStateChange((event, session) => {});
  }

  public async signInWithProvider(provider: Provider): Promise<void> {
    await this.supaBase.auth.signInWithOAuth({
      provider,
    });
  }

  public async signOut(): Promise<void> {
    await this.supaBase.auth.signOut();
  }
}
