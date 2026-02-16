import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  private readonly translateService = inject(TranslateService);

  get currentLang(): string {
    return this.translateService.getCurrentLang() || this.translateService.getFallbackLang() || 'en';
  }

  switchLanguage(lang: string): void {
    this.translateService.use(lang);
  }
}
