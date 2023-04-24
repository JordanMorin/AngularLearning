import { Component, Input, OnInit } from '@angular/core';

import { FaceSnap } from '../models/face-snap.model';

@Component({
    selector: 'app-face-snap',
    templateUrl: './face-snap.component.html',
    styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {

    @Input() faceSnap!: FaceSnap;
    title!: string;
    description!: string;
    id!: number;
    creationDate!: Date;
    snaps!: number;
    imageUrl!: string;
    canLike!: boolean;
    btnText!: string;


    ngOnInit() {
        this.title = "Le titre est fou";
        this.description = "mais la description est encore plus folle";
        this.id = 16;
        this.creationDate = new Date();
        this.snaps = 6;
        this.imageUrl = 'https://picsum.photos/200/200?blur=2';
        this.canLike = true;
        this.btnText = "Snap !";
    }


    onAddSnap() {
        if (this.btnText === 'Snap !') {
            this.faceSnap.snaps++;
            this.btnText = 'Oops, unSnap!';
        }
        else {
            this.faceSnap.snaps--;
            this.btnText = 'Snap !';
        }
    }

}