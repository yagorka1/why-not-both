import { computed, Injectable, signal } from '@angular/core';
import { GAME_CONFIG, QUESTIONS } from '../constants/game.constants';
import { GameState } from '../enums/game-state.enum';
import { OptionSide } from '../enums/option-side.enum';
import { QuestionOption } from '../interfaces/question-option.interface';
import { Question } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly _currentQuestionIndex = signal<number>(0);
  private readonly _gameState = signal<GameState>(GameState.PLAYING);
  private readonly _chosenSide = signal<OptionSide | null>(null);

  readonly currentQuestionIndex = this._currentQuestionIndex.asReadonly();
  readonly gameState = this._gameState.asReadonly();
  readonly chosenSide = this._chosenSide.asReadonly();

  readonly currentQuestion = computed<Question>(
    () => QUESTIONS[this._currentQuestionIndex()]
  );

  readonly totalQuestions = computed<number>(() => GAME_CONFIG.TOTAL_QUESTIONS);

  readonly questionNumber = computed<number>(
    () => this._currentQuestionIndex() + 1
  );

  readonly chosenOption = computed<QuestionOption | null>(() => {
    const side = this._chosenSide();
    if (!side) return null;

    const question = this.currentQuestion();
    return side === OptionSide.LEFT ? question.optionLeft : question.optionRight;
  });

  readonly isPlaying = computed<boolean>(
    () => this._gameState() === GameState.PLAYING
  );

  readonly isChosen = computed<boolean>(
    () => this._gameState() === GameState.CHOSEN
  );

  readonly isEnded = computed<boolean>(
    () => this._gameState() === GameState.ENDED
  );

  public selectOption(side: OptionSide): void {
    this._chosenSide.set(side);
    this._gameState.set(GameState.CHOSEN);
  }

  public nextQuestion(): void {
    const nextIndex = this._currentQuestionIndex() + 1;

    if (nextIndex >= GAME_CONFIG.TOTAL_QUESTIONS) {
      this._gameState.set(GameState.ENDED);
    } else {
      this._currentQuestionIndex.set(nextIndex);
      this._chosenSide.set(null);
      this._gameState.set(GameState.PLAYING);
    }
  }

  public restart(): void {
    this._currentQuestionIndex.set(0);
    this._chosenSide.set(null);
    this._gameState.set(GameState.PLAYING);
  }
}
