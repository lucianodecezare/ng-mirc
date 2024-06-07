import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { IChatMessage } from '../../interface';
import { DatePipe } from '@angular/common';
import { MessageSenderComponent } from '../../components/';

@Component({
  imports: [DatePipe, MessageSenderComponent, ReactiveFormsModule],
  providers: [ChatService],
  selector: 'app-chat',
  standalone: true,
  styleUrl: './chat.component.scss',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  private authService = inject(AuthService);

  private changeDetector = inject(ChangeDetectorRef);

  private chatService = inject(ChatService);

  private formBuilder = inject(FormBuilder);

  private router = inject(Router);

  public chatForm!: FormGroup;

  public chats = signal<IChatMessage[]>([]);

  constructor() {
    this.chatForm = this.formBuilder.group({
      chat_message: ['', Validators.required],
    });

    effect(() => {
      this.onListChat();
    });
  }

  public tempValidatorRequired() {
    this.changeDetector.detectChanges();
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

  public onListChat(): void {
    this.chatService
      .listChat()
      .then((res: IChatMessage[]) => {
        if (res !== null) {
          this.chats.set(res);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  public onSubmit(event: { chat_message: string }): void {
    const { chatForm } = this;
    const { chat_message } = event;

    this.chatService
      .chatMessage(chat_message)
      .then((res) => {
        chatForm.reset();
        this.onListChat();
      })
      .catch((error) => {
        alert(error);
      });
  }
}
