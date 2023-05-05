import { EventEmitter } from '@angular/core';
import { forkJoin, Observable, of, Subscriber } from 'rxjs';

/**
 * La base de tous les événements, ils sont un sender
 */
export class EventBase<TSender> {
    public sender: TSender;

    constructor(sender: TSender) {
        this.sender = sender;
    }
}

/**
 * Un événement qu'un écouteur peut annuler
 */
export class EventCancelable<TSender> extends EventBase<TSender> {
    constructor(sender: TSender) {
        super(sender);
    }

    public cancel = false;
}

/**
 * Un événement qu'un écouteur peut annuler et qui transporte une valeur
 */
export class EventCancelableData<T, TSender> extends EventCancelable<TSender> {
    public data: T;

    constructor(sender: TSender, data: T) {
        super(sender);
        this.data = data;
    }
}

/**
 * Base class for events with observable reply's management
 */
export class EventObs<T, TSender> extends EventBase<TSender> {
    public observables: Observable<T>[];

    constructor(sender: TSender) {
        super(sender);
        this.observables = [];
    }

    public add(val: any): void {
        if (!(val instanceof Observable)) {
            val = of(val);
        }
        this.observables.push(val);
    }
}

export enum EventType {
    BEFORE_EDIT = 'beforeEdit',
    AFTER_EDIT = 'afterEdit',
    BEFORE_POST = 'beforePost',
    AFTER_POST = 'afterPost',
    BEFORE_DELETE = 'beforeDelete',
    AFTER_DELETE = 'afterDelete',
    BEFORE_CREATE = 'beforeCreate',
    AFTER_CREATE = 'afterCreate',
    BEFORE_SELECT = 'beforeSelect',
    AFTER_SELECT = 'afterSelect',
    AFTER_CELL_EDIT = 'afterCellEdit',
    BEFORE_CELL_EDIT = 'beforeCellEdit',
    BEFORE_DISPLAY = 'beforeDisplay',
    CELL_CUSTOM_EVENT = 'cellCustomEvent',
    ON_FOCUS = 'onFocus',
    EMPTY = 'empty',
    BEFORE_DUPLICATE = 'beforeDuplicate',
    AFTER_DUPLICATE = 'afterDuplicate'
}

enum Capability {
    None = 0,
    Add = 1 << 0,
    Delete = 1 << 1,
    Edit = 1 << 2,
    Select = 1 << 3,
    All = Add | Delete | Edit | Select
}

// export class UiEvent {

//     public TypeEvent: EventType;
//     public Data: any;

//     constructor(typeEvent: EventType, data: any) {
//         this.TypeEvent = typeEvent;
//         this.Data = data;
//     }
// }

/**
 * Generic class for event with observable reply's management and data transport
 */
export class EventObsData<TReply, TSender> extends EventObs<TReply, TSender> {

    public EventData: any;

    constructor(sender: TSender, data: any) {
        super(sender);
        this.EventData = data;
    }
}

export class EventObsCancelableData<TSender> extends EventObsData<boolean, TSender> {

    private realCancel = false;

    public capacite: Capability = Capability.None;

    public set cancel(value: boolean) {
        if (!this.realCancel) {
            this.realCancel = value;
        }
    }

    public get cancel(): boolean {
        return this.realCancel;
    }

    public TypeEvent: EventType;

    constructor(sender: TSender, typeEvent: EventType, data: any) {
        super(sender, data);
        this.TypeEvent = typeEvent;
    }

    /**
     * emit function emits the event and manage the result before calling fn callback function
     */
    public emit(evt: EventEmitter<EventObsCancelableData<TSender>>, callback: (eventData: EventObsCancelableData<TSender>, response: boolean) => void): void {

        evt.emit(this);

        const self = this;

        // if event has not been processed by 'clients', the observable array is empty
        if (this.observables.length === 0) {
            if (callback) {
                // not cancelled
                return callback(this, this.cancel);
            } else {
                return;
            }
        } else {
            // use observables (starts observables and join result)
            forkJoin(self.observables)
                .subscribe(
                    (t) => {
                        // cancel if some values are true
                        const res = t.some((v) => v);
                        self.cancel = (res || self.cancel);
                        callback(self, self.cancel);
                    },
                    (err) => {
                        console.log(err);
                    });
        }
    }

    public WaitResponse(callback: (observer: Subscriber<any>, ...params: any[]) => void): void {
        // ajoute un nouvel observabble à la liste
        this.add(new Observable((observer) => {
            callback(observer, this);
        }));
    }

    /** Termine l'event en plaçant cancel */
    public Complete(observer: Subscriber<boolean>, cancel: boolean): void {
        this.cancel = cancel;
        observer.next(cancel);
        observer.complete();
        observer.unsubscribe();
    }

    public throwError(err: Error, showmessage: boolean): void {
        // this.hasError = true;
        // this.thrownError = err;
        this.cancel = true;
        // this.terminateObservables();
        // if (showmessage && err && this.msgService) {
        //     this.msgService.showToastTrad('ERROR.ERREUR', err.message, MessageBoxIcon.Danger);
        // }
    }
}

export class CancelableEventEmitter<TSender> extends EventEmitter<EventObsCancelableData<TSender>> {
    public sender: TSender;

    constructor(sender: TSender) {
        super();
        this.sender = sender;
    }

    public cancelableEmit(typeeent: EventType, data: any, callback: (eventData: EventObsCancelableData<TSender>, reponse: boolean) => void): void {
        const obsdata = new EventObsCancelableData<TSender>(this.sender, typeeent, data);
        obsdata.emit(this, callback);
    }
}

export class TypedEventObsCancelableData<TSender, TData> extends EventObsCancelableData<TSender> {

    constructor(sender: TSender, typeEvent: EventType, data: TData) {
        super(sender, typeEvent, data);
    }
}

export class TypedCancelableEventEmitter<TSender, TData extends IData> extends CancelableEventEmitter<TSender> {
    constructor(sender: TSender) {
        super(sender);
    }

    public override cancelableEmit(typeeent: EventType, data: TData, callback: (eventData: TypedEventObsCancelableData<TSender, TData>, reponse: boolean) => void): void {
        const obsdata = new TypedEventObsCancelableData<TSender, TData>(this.sender, typeeent, data);
        obsdata.emit(this, callback);
    }
}

export interface IData {
    data: any;
}

/*
    EXEMPLE : http://plnkr.co/edit/j0LeLWygrQYzI7Dszj5Y?p=preview

    Partie enfant:
        let value = { text: 'yolo' };
        let e = new EventObsCancelableData<any>(this, value);
        e.emit(self.doCreateElement, cancel => {
            // if not cancelled
            console.log(value);

            if (!e.cancel && !cancel) {
                console.log('ok');
            } else {
                console.log('ko');
            }
        });

    Partie parent:
        let self = this;
        evt.add(new Observable(observer => {
            self.msgService.yesNo('Créer conducteur', 'bla bla bla').subscribe(r => {
                if (r == 1) {
                    evt.data.text = 'yolo oui';
                    observer.next(false);
                } else {
                    evt.data.text = 'yolo non';
                    observer.next(true);
                }
                observer.complete();
            })
        }));
 */
