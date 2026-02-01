import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { OptionSide } from '../../../../core/enums/option-side.enum';
import { QuestionOption } from '../../../../core/interfaces/question-option.interface';

@Component({
  selector: 'app-chosen-overlay',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chosen-overlay.component.html',
  styleUrl: './chosen-overlay.component.scss',
})
export class ChosenOverlayComponent {
  protected readonly OptionSide = OptionSide;

  readonly visible = input.required<boolean>();
  readonly side = input.required<OptionSide | null>();
  readonly option = input.required<QuestionOption | null>();

  readonly next = output<void>();

  onNext(): void {
    this.next.emit();
  }
}
