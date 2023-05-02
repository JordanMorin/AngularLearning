import { Component, Input, OnInit } from '@angular/core';
import { FaceSnapService } from 'src/app/services/face-snaps.service';

import { FaceSnap } from '../models/face-snap.model';

@Component({
    selector: 'app-face-snap',
    templateUrl: './face-snap.component.html',
    styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {

    @Input() faceSnap!: FaceSnap;
    btnText!: string;

    constructor(private FaceSnapsService: FaceSnapService) { }

    ngOnInit() {
        this.btnText = "Snap !";
    }


    onAddSnap() {
        if (this.btnText === 'Snap !') {
            this.FaceSnapsService.snapFaceSnapById(this.faceSnap.id, "+")
            this.btnText = 'Oops, unSnap!';
        }
        else {
            this.FaceSnapsService.snapFaceSnapById(this.faceSnap.id, "-")
            this.btnText = 'Snap !';
        }
    }

}