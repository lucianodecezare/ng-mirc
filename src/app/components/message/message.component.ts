import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [DatePipe],
  selector: 'app-message',
  standalone: true,
  templateUrl: './message.component.html',
})
export class MessageComponent {
  @Input() date!: Date | undefined;

  @Input() message!: string | undefined;

  @Input() name!: string | undefined;
}
