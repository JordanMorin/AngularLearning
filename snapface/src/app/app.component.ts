import { Component, OnInit } from '@angular/core';
import { FaceSnap } from 'src/app/models/face-snap.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    mySnap!: FaceSnap;

    ngOnInit() {
        let id = 4;
        let picture = "https://picsum.photos/id/" + id.toString() + "/200/100";
        this.mySnap = new FaceSnap(id, "Bonjour", "ceci est une description", picture, new Date(), 6)
    }
}