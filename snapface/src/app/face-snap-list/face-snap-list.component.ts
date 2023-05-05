import { Component } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { FaceSnap } from 'src/app/models/face-snap.model';
import { FaceSnapService } from 'src/app/services/face-snaps.service';

@Component({
    selector: 'app-face-snap-list',
    templateUrl: './face-snap-list.component.html',
    styleUrls: ['./face-snap-list.component.scss'],
})
export class FaceSnapListComponent {

    public lesSnaps: FaceSnap[] = this.faceSnapService.getAllFaceSnaps();
    public reactions: string[] = [];
    public changelogs: { valueText: string, valueNumber: number, old_valueText: string, old_valueNumber: number }[] = [];

    constructor(public faceSnapService: FaceSnapService) { }

    public getAllSnaps(): FaceSnap[] {
        return this.lesSnaps;
    }

    public logOutput(info: string): void {
        //console.log(info);
        this.reactions.push(info);
    }

    public logChangesOutput(infos: { valueText: string, valueNumber: number, old_valueText: string, old_valueNumber: number }): void {
        this.changelogs.push(infos)
    }
    public onSave(): void {
        //il faut check les dates, c'est degueu
        //il faut installer export to csv
        //npm install --save export-to-csv 
        const options = {
            fieldSeparator: ',',
            quoteStrings: '',
            decimalSeparator: '.',
            showLabels: false,
            showTitle: false,
            title: 'data',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: false,
            // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
        };

        const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv(this.lesSnaps);
    }
}
