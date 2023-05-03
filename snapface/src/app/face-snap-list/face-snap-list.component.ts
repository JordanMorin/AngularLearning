import { Component } from '@angular/core';
import { FaceSnap } from 'src/app/models/face-snap.model';
import { FaceSnapService } from 'src/app/services/face-snaps.service';

@Component({
    selector: 'app-face-snap-list',
    templateUrl: './face-snap-list.component.html',
    styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent {

    public lesSnaps!: FaceSnap[];

    constructor(public faceSnapService: FaceSnapService) { }

    ngOnInit(): void {
    }

    public getAllSnaps(): FaceSnap[] {
        return this.faceSnapService.getAllFaceSnaps();
    }

    public logOutput(info: Event) {
        console.log(info)
    }

}
