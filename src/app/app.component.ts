import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header-components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomepageComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gym-abm';
}
