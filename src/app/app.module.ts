import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HerosectionComponent } from './herosection/herosection.component';
import { ClienteleComponent } from './clientele/clientele.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { JourneysectionComponent } from './journeysection/journeysection.component';
import { ContactsectionComponent } from './contactsection/contactsection.component';
import { CustomCursorComponent } from './custom-cursor/custom-cursor.component';
import { DecryptedTextComponent } from './decrypted-text/decrypted-text.component';
import { DotGridComponent } from './dot-grid/dot-grid.component';
import { PillNavComponent } from './pill-nav/pill-nav.component';
import { InteractiveHoverButtonComponent } from './interactive-hover-button/interactive-hover-button.component';
import { TiltedCardComponent } from './tilted-card/tilted-card.component';
import { FootersectionComponent } from './footersection/footersection.component';

@NgModule({
  declarations: [
    AppComponent,
    HerosectionComponent,
    ClienteleComponent,
    ServicesSectionComponent,
    JourneysectionComponent,
    ContactsectionComponent,
    CustomCursorComponent,
    DecryptedTextComponent,
    DotGridComponent,
    PillNavComponent,
    InteractiveHoverButtonComponent,
    FootersectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TiltedCardComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
