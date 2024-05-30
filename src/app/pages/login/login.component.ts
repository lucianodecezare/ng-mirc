import { Component, inject } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);

  async handleAuth(): Promise<void> {
    await this.authService.signInWithProvider('github');
  }
}
