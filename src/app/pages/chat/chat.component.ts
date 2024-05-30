import { Component, inject } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  styleUrl: './chat.component.scss',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  private authService = inject(AuthService);

  private router = inject(Router);

  public handleLogOut(): void {
    this.authService
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}
