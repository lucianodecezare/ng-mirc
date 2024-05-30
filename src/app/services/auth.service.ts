import { Injectable, inject } from '@angular/core';
import { Provider, SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supaBase!: SupabaseClient;

  private router = inject(Router);

  constructor() {
    const { supaBaseKey, supaBaseUrl } = environment;

    this.supaBase = createClient(supaBaseUrl, supaBaseKey);

    this.supaBase.auth.onAuthStateChange((event, session) => {
      localStorage.setItem('session', JSON.stringify(session?.user));

      if (session?.user) {
        this.router.navigate(['/chat']);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('session');

    if (user) {
      return true;
    }

    return false;
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
