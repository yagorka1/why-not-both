import { Component, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-end-screen',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './end-screen.component.html',
  styleUrl: './end-screen.component.scss',
})
export class EndScreenComponent {
  readonly restart = output<void>();

  onRestart(): void {
    this.restart.emit();
  }
}

