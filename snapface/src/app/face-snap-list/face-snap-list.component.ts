import { Component } from '@angular/core';
import { FaceSnap } from 'src/app/models/face-snap.model';
import { FaceSnapService } from 'src/app/services/face-snaps.service';

@Component({
    selector: 'app-face-snap-list',
    templateUrl: './face-snap-list.component.html',
    styleUrls: ['./face-snap-list.component.scss'],
})
export class FaceSnapListComponent {

    public lesSnaps!: FaceSnap[];
    public reactions: string[] = [];

    constructor(public faceSnapService: FaceSnapService) { }

    public getAllSnaps(): FaceSnap[] {
        return this.faceSnapService.getAllFaceSnaps();
    }

    public logOutput(info: string): void {
        //console.log(info);
        this.reactions.push(info);
    }

}
