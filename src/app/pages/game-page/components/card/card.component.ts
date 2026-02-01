import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { OptionSide } from '../../../../core/enums/option-side.enum';
import { QuestionOption } from '../../../../core/interfaces/question-option.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  readonly option = input.required<QuestionOption>();
  readonly side = input.required<OptionSide>();
  readonly animationDelay = input<number>(0);

  readonly selected = output<OptionSide>();

  protected readonly isLeft = computed(() => this.side() === OptionSide.LEFT);
  protected readonly isRight = computed(() => this.side() === OptionSide.RIGHT);
  
  protected readonly animationStyle = computed(() => ({
    animationDelay: `${this.animationDelay()}ms`,
  }));

  onClick(): void {
    this.selected.emit(this.side());
  }
}
