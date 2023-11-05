import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@frontend/shared/guards/auth.guard';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'calendar',
        loadChildren: () => import('./calendar-day/calendar-day.module').then(m => m.CalendarDayModule),
        canActivate: [ AuthGuard ],
    },
    {
        path: 'import',
        loadChildren: () => import('./import/import.module').then(m => m.ImportModule),
        canActivate: [ AuthGuard ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
