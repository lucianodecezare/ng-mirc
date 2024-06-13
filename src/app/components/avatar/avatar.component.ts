import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  styleUrls: ['./avatar.component.scss'],
  templateUrl: './avatar.component.html',
})
export class AvatarComponent {
  @Input() src!: string | undefined;
}
