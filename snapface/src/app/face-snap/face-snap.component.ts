import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from 'src/app/models/face-snap.model';
import { FaceSnapService } from 'src/app/services/face-snaps.service';

@Component({
    selector: 'app-face-snap',
    templateUrl: './face-snap.component.html',
    styleUrls: ['./face-snap.component.scss'],
})
export class FaceSnapComponent implements OnInit {

    @Input() public faceSnap!: FaceSnap;
    @Output() private newItemEvent = new EventEmitter<string>();
    public btnText!: string;

    constructor(private FaceSnapsService: FaceSnapService, private router: Router) { }

    public ngOnInit(): void {
        this.btnText = "Snap !";
    }

    public onViewFaceSnap(): void {
        this.router.navigateByUrl(`facesnaps/${ this.faceSnap.id }`);
    }

    public onReact(reaction: string): void {
        //console.log(`${ this.faceSnap.title } a reçu la réaction ${ reaction }.`);
        let stringOutput: string = `${ this.faceSnap.id } - ${ this.faceSnap.title } a reçu la réaction ${ reaction }.`;
        this.newItemEvent.emit(stringOutput)
    }

}