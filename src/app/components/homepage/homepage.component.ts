import { Component } from '@angular/core';
import { MainActionsComponent } from '../main-actions/main-actions.component';

@Component({
  selector: 'app-homepage',
  imports: [MainActionsComponent],
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
