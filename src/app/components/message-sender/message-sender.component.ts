import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-message-sender',
  standalone: true,
  styleUrls: ['./message-sender.component.scss'],
  templateUrl: './message-sender.component.html',
})
export class MessageSenderComponent {
  @Input() chatForm!: FormGroup;

  @Output() onSubmit = new EventEmitter<any>();

  private _changeDetector = inject(ChangeDetectorRef);

  public tempValidatorRequired() {
    this._changeDetector.detectChanges();
  }
}
