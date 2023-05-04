import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { AppComponent } from './app.component';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component';
import { FaceSnapComponent } from './face-snap/face-snap.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleFaceSnapComponent } from './single-face-snap/single-face-snap.component';
import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
    declarations: [
        AppComponent,
        FaceSnapComponent,
        FaceSnapListComponent,
        HeaderComponent,
        LandingPageComponent,
        SingleFaceSnapComponent,
        TextInputComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {
        registerLocaleData(fr.default);
    }
}
