import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/calendar',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }