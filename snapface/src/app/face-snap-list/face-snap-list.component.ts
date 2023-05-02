import { Component } from '@angular/core';
import { FaceSnap } from 'src/app/models/face-snap.model';

@Component({
    selector: 'app-face-snap-list',
    templateUrl: './face-snap-list.component.html',
    styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent {

    lesSnaps!: FaceSnap[];

    ngOnInit() {

    }

}
