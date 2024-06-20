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
import { AvatarComponent, MessageSenderComponent } from '../../components/';
import { MessageComponent } from '../../components/message/message.component';

@Component({
  imports: [
    AvatarComponent,
    MessageComponent,
    MessageSenderComponent,
    ReactiveFormsModule,
  ],
  providers: [ChatService],
  selector: 'app-chat',
  standalone: true,
  styleUrl: './chat.component.scss',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  private _authService = inject(AuthService);

  private _changeDetector = inject(ChangeDetectorRef);

  private _chatService = inject(ChatService);

  private _formBuilder = inject(FormBuilder);

  private _router = inject(Router);

  public chatForm!: FormGroup;

  public chats = signal<IChatMessage[]>([]);

  constructor() {
    this.chatForm = this._formBuilder.group({
      chat_message: ['', Validators.required],
    });

    effect(() => {
      this.onListChat();
    });
  }

  public tempValidatorRequired() {
    this._changeDetector.detectChanges();
  }

  public handleLogOut(): void {
    this._authService
      .signOut()
      .then(() => {
        this._router.navigate(['/login']);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  public onListChat(): void {
    this._chatService
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

    this._chatService
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
