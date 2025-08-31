import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerosectionComponent } from './herosection/herosection.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { ContactsectionComponent } from './contactsection/contactsection.component';
import { JourneysectionComponent } from './journeysection/journeysection.component';
import { WebserviceComponent } from './servicedetail/webservice/webservice.component';
import { LightRayComponent } from './light-ray/light-ray.component';


const routes: Routes = [
  { path: '', redirectTo: '/hero', pathMatch: 'full' } ,// default route
  { path: 'hero', component: HerosectionComponent },
  { path: 'service', component: ServicesSectionComponent},
  { path: 'contact', component: ContactsectionComponent },
  { path: 'about', component: JourneysectionComponent },
  { path: 'webservice', component: WebserviceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
