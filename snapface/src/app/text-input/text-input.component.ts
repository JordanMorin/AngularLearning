import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
    @Input() public modelValue: string = "";

    public editText(str: string): void {
        this.modelValue = str;
    }

    public getText(): string {
        return this.modelValue;
    }
}
