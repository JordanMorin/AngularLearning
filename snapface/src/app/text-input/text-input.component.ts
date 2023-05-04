import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
    @Input() public modelValue: string = "";
    @Output() private newItemEvent = new EventEmitter<string>();

    public editText(str: string): void {
        this.modelValue = str;
    }

    public onEdit(monEvent: Event): void {
        this.modelValue = monEvent.target.value;
        this.newItemEvent.emit(this.modelValue);
        console.log(monEvent);
    }
}
