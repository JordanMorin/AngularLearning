import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaceSnapListComponent } from 'src/app/face-snap-list/face-snap-list.component';
import { LandingPageComponent } from 'src/app/landing-page/landing-page.component';
import { SingleFaceSnapComponent } from 'src/app/single-face-snap/single-face-snap.component';


const routes: Routes = [
    { path: 'facesnaps', component: FaceSnapListComponent },
    { path: 'facesnaps/:id', component: SingleFaceSnapComponent },
    { path: '', component: LandingPageComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}