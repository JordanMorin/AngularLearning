import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaceSnapService } from 'src/app/services/face-snaps.service';

import { FaceSnap } from '../models/face-snap.model';

@Component({
    selector: 'single-face-snap',
    templateUrl: './single-face-snap.component.html',
    styleUrls: ['./single-face-snap.component.scss'],
})
export class SingleFaceSnapComponent implements OnInit {

    public faceSnap!: FaceSnap;
    public btnText!: string;

    constructor(private FaceSnapsService: FaceSnapService, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.btnText = "Snap !";
        // mettre + devant un string le cast en number
        const faceSnapId = +this.route.snapshot.params['id'];
        this.faceSnap = this.FaceSnapsService.getFaceSnapById(faceSnapId);

    }

    public onAddSnap(): void {
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