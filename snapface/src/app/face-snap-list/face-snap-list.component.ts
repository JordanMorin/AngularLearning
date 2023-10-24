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
    public file: any;
    constructor(public faceSnapService: FaceSnapService) { }

    public getAllSnaps(): FaceSnap[] {
        return this.lesSnaps;
    }

    public addFaceSnapInList(unFaceSnap: FaceSnap): void {
        this.lesSnaps.push(unFaceSnap);
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

    public fileChanged(file: any): void {
        this.file = file.target.files[0];
    }

    public uploadSave(): void {
        this.lesSnaps = [];
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            console.log(fileReader.result);
            let lines = fileReader.result?.toString().split("\n");
            console.log(lines);
            lines?.forEach(function (value) {
                let unFaceSnap: FaceSnap = new FaceSnap();
                unFaceSnap.id = parseInt(value[0]);
                unFaceSnap.title = value[1];
                unFaceSnap.description = value[2];
                unFaceSnap.imageUrl = value[3];
                unFaceSnap.snaps = parseInt(value[5]);
                if (value[6] != "undefined") {
                    unFaceSnap.location = value[6];
                }
                unFaceSnap.views = parseInt(value[7]);
            });
        }
        fileReader.readAsText(this.file);
    }
}
