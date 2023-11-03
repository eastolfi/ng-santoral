import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'calendar',
        loadChildren: () => import('./calendar-day/calendar-day.module').then(m => m.CalendarDayModule)
    },
    {
        path: 'import',
        loadChildren: () => import('./import/import.module').then(m => m.ImportModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
