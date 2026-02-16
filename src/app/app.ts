import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from "./core/components/language-switcher/language-switcher.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LanguageSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('why-not-both');
}
