import { Injectable } from '@angular/core';
import { FaceSnap } from 'src/app/models/face-snap.model';

@Injectable({
    providedIn: 'root'
})

export class FaceSnapService {

    lesSnaps: FaceSnap[] = [
        {
            id: 1,
            title: 'Archibald',
            description: 'Mon meilleur ami depuis tout petit !',
            imageUrl: 'https://picsum.photos/id/' + 1 + '/200/100',
            createdDate: new Date(),
            snaps: 14,
            location: 'Toulouse'
        }, {
            id: 2,
            title: 'Three Rock Mountain',
            description: 'Un endroit magnifique pour les randonnées.',
            imageUrl: 'https://picsum.photos/id/' + 2 + '/200/100',
            createdDate: new Date(),
            snaps: 1
        }, {
            id: 3,
            title: 'Un bon repas',
            description: 'Mmmh que c\'est bon !',
            imageUrl: 'https://picsum.photos/id/' + 3 + '/200/100',
            createdDate: new Date(),
            snaps: 21,
            location: 'un endroit où je sais pas ou c\'est'
        }]

}