import { Routes } from '@angular/router';
import { PeopleComponent } from './components/main-actions-site/people/people.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DisciplinesGridComponent } from './components/main-actions-site/Disciplines/disciplines-grid/disciplines-grid.component';
import { MusculacionComponent } from './components/main-actions-site/Disciplines/musculacion/musculacion.component';
import { CrossfitComponent } from './components/main-actions-site/Disciplines/crossfit/crossfit.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'people', component: PeopleComponent},
    {path: 'disciplines-grid', component: DisciplinesGridComponent},
    {path: 'musculacion', component: MusculacionComponent},
    {path: 'crossfit', component: CrossfitComponent}
];
