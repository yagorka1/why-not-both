import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-question-counter',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './question-counter.component.html',
  styleUrl: './question-counter.component.scss',
})
export class QuestionCounterComponent {
  readonly current = input.required<number>();
}

