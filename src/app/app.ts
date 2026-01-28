import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 70px);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
