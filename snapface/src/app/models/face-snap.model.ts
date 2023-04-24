export class FaceSnap {
    ID: number;
    title: string;
    description: string;
    createdDate: Date;
    snaps: number;
    imageUrl: string;


    constructor(id: number, title: string, description: string, imageUrl: string, createdDate: Date, snaps: number) {
        this.ID = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdDate = createdDate;
        this.snaps = snaps;
    }
}