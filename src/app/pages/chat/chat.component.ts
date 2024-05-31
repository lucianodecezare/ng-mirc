import { Component, inject } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  imports: [ReactiveFormsModule],
  providers: [ChatService],
  selector: 'app-chat',
  standalone: true,
  styleUrl: './chat.component.scss',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  private authService = inject(AuthService);

  private chatService = inject(ChatService);

  private formBuilder = inject(FormBuilder);

  private router = inject(Router);

  public chatForm!: FormGroup;

  constructor() {
    this.chatForm = this.formBuilder.group({
      chat_message: ['', Validators.required],
    });
  }

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

  public onSubmit() {
    const { chatForm, chatService } = this;
    const { chat_message } = chatForm.value;

    chatService
      .chatMessage(chat_message)
      .then((res) => {
        chatForm.reset();
      })
      .catch((error) => {
        alert(error);
      });
  }
}
