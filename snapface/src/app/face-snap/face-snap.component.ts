import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FaceSnap } from 'src/app/models/face-snap.model';

@Component({
    selector: 'app-face-snap',
    templateUrl: './face-snap.component.html',
    styleUrls: ['./face-snap.component.scss'],
})

export class FaceSnapComponent implements OnInit {

    @Input() public faceSnap!: FaceSnap;
    @Output() public newItemEvent = new EventEmitter<string>();
    @Output() public anotherNewItemEvent = new EventEmitter<{}>();
    public btnText!: string;

    constructor(private router: Router) { }

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

    public onAddSnap(): void {
        if (this.btnText === 'Snap !') {
            this.faceSnap.snaps++;
            this.btnText = 'Oops, unSnap!';
        }
        else {
            this.faceSnap.snaps--;
            this.btnText = 'Snap !';
        }
    }

    //executé à chaque update d'un enfant text-input ou number-input
    public onUpdate(): void {
        this.anotherNewItemEvent.emit(this.createDynamiqueObject())
    }

    private createDynamiqueObject(): any {
        let myDynamicObject = {
            valueInputText: this.faceSnap.description,
            valueInputNumber: this.faceSnap.views,
        };
        return myDynamicObject;
    }
}