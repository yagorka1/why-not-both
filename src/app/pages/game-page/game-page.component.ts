import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ANIMATION } from '../../core/constants/game.constants';
import { OptionSide } from '../../core/enums/option-side.enum';
import { ConfettiService } from '../../core/services/confetti.service';
import { GameService } from '../../core/services/game.service';
import { CardComponent } from './components/card/card.component';
import { ChosenOverlayComponent } from './components/chosen-overlay/chosen-overlay.component';
import { EndScreenComponent } from './components/end-screen/end-screen.component';
import { HeaderComponent } from './components/header/header.component';
import { QuestionCounterComponent } from './components/question-counter/question-counter.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    NgIf,
    TranslatePipe,
    CardComponent,
    HeaderComponent,
    QuestionCounterComponent,
    ChosenOverlayComponent,
    EndScreenComponent,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  protected readonly gameService = inject(GameService);
  private readonly confettiService = inject(ConfettiService);

  protected readonly OptionSide = OptionSide;
  protected readonly leftCardDelay = ANIMATION.CARD_IN_DELAY_MS;
  protected readonly rightCardDelay =
    ANIMATION.CARD_IN_DELAY_MS + ANIMATION.CARD_IN_STAGGER_MS;

  onCardSelected(side: OptionSide): void {
    this.gameService.selectOption(side);
    this.confettiService.spawn(side);
  }

  onNext(): void {
    this.gameService.nextQuestion();
  }

  onRestart(): void {
    this.gameService.restart();
  }
}
