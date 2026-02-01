import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ANIMATION, COLORS } from '../constants/game.constants';
import { OptionSide } from '../enums/option-side.enum';

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  private readonly platformId = inject(PLATFORM_ID);

  spawn(side: OptionSide): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const colors =
      side === OptionSide.LEFT ? COLORS.CONFETTI_LEFT : COLORS.CONFETTI_RIGHT;

    for (let i = 0; i < ANIMATION.CONFETTI_PARTICLE_COUNT; i++) {
      this.createParticle(colors);
    }
  }

  private createParticle(colors: readonly string[]): void {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';

    const size = 5 + Math.random() * 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const leftPosition = Math.random() * 100;
    const animationDuration = 1.2 + Math.random() * 1.2;
    const animationDelay = Math.random() * 0.3;

    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      left: ${leftPosition}vw;
      top: 0;
      background: ${color};
      border-radius: 2px;
      pointer-events: none;
      z-index: 99;
      animation: confetti-fall ${animationDuration}s ${animationDelay}s linear forwards;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, ANIMATION.CONFETTI_DURATION_MS);
  }
}
