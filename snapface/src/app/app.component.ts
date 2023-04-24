import { Component, OnInit } from '@angular/core';
import { FaceSnap } from 'src/app/models/face-snap.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    mySnap!: FaceSnap;
    myOtherSnap!: FaceSnap;
    myThirdSnap!: FaceSnap;

    ngOnInit() {
        let id = 1;
        this.mySnap = {
            id: id,
            title: 'Archibald',
            description: 'Mon meilleur ami depuis tout petit !',
            imageUrl: 'https://picsum.photos/id/' + id + '/200/100',
            createdDate: new Date(),
            snaps: 0,
            location: "Toulouse"
        };

        id = 2;
        this.myOtherSnap = {
            id: id,
            title: 'Three Rock Mountain',
            description: 'Un endroit magnifique pour les randonnées.',
            imageUrl: 'https://picsum.photos/id/' + id + '/200/100',
            createdDate: new Date(),
            snaps: 0
        };

        id = 3;
        this.myThirdSnap = {
            id: id,
            title: 'Un bon repas',
            description: 'Mmmh que c\'est bon !',
            imageUrl: 'https://picsum.photos/id/' + id + '/200/100',
            createdDate: new Date(),
            snaps: 0,
            location: "Ici"
        };
    }
}