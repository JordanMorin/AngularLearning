import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnapService } from 'src/app/services/face-snaps.service';

import { FaceSnap } from '../models/face-snap.model';

@Component({
    selector: 'app-face-snap',
    templateUrl: './face-snap.component.html',
    styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {

    @Input() faceSnap!: FaceSnap;
    public btnText!: string;

    constructor(private FaceSnapsService: FaceSnapService, private router: Router) { }

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

    onViewFaceSnap() {
        this.router.navigateByUrl(`facesnaps/${ this.faceSnap.id }`);
    }

}