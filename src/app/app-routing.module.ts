import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerosectionComponent } from './herosection/herosection.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { ContactsectionComponent } from './contactsection/contactsection.component';
import { JourneysectionComponent } from './journeysection/journeysection.component';
import { WebserviceComponent } from './servicedetail/webservice/webservice.component';
import { DigitalmarketingserviceComponent } from './servicedetail/digitalmarketingservice/digitalmarketingservice.component';
import { BrandingComponent } from './servicedetail/branding/branding.component';
import { ShopifystoreComponent } from './servicedetail/shopifystore/shopifystore.component';
import { ContentcreationComponent } from './servicedetail/contentcreation/contentcreation.component';
import { StudentprojectComponent } from './servicedetail/studentproject/studentproject.component';

const routes: Routes = [
  { path: '', redirectTo: '/hero', pathMatch: 'full' } ,
  { path: 'hero', component: HerosectionComponent },
  { path: 'service', component: ServicesSectionComponent},
  { path: 'contact', component: ContactsectionComponent },
  { path: 'about', component: JourneysectionComponent },
  { path: 'web-services', component: WebserviceComponent },
  { path: 'digital-marketing', component: DigitalmarketingserviceComponent },
  { path: 'branding', component: BrandingComponent },
  { path: 'shopify-store', component: ShopifystoreComponent },
  { path: 'content-creation', component: ContentcreationComponent },
  { path: 'student-project', component: StudentprojectComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
