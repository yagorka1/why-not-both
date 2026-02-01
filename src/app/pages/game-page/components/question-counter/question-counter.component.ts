import { Component, input } from '@angular/core';

@Component({
  selector: 'app-question-counter',
  standalone: true,
  templateUrl: './question-counter.component.html',
  styleUrl: './question-counter.component.scss',
})
export class QuestionCounterComponent {
  readonly current = input.required<number>();
}
