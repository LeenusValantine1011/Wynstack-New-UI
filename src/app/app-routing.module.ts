import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerosectionComponent } from './herosection/herosection.component';


const routes: Routes = [
  { path: '', redirectTo: '/hero', pathMatch: 'full' } ,// default route
  { path: 'hero', component: HerosectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
