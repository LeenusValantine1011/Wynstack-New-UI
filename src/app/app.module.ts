import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HerosectionComponent } from './herosection/herosection.component';
import { ClienteleComponent } from './clientele/clientele.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { JourneysectionComponent } from './journeysection/journeysection.component';
import { ContactsectionComponent } from './contactsection/contactsection.component';

@NgModule({
  declarations: [
    AppComponent,
    HerosectionComponent,
    ClienteleComponent,
    ServicesSectionComponent,
    JourneysectionComponent,
    ContactsectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
