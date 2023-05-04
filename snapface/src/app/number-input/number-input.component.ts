import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss'],
})
export class NumberInputComponent {
    @Input() public modelValue: number = 0;
    @Output() public modelValueChange = new EventEmitter();

    public editText(str: number): void {
        this.modelValue = str;
    }

    public onEdit(monEvent: any): void {
        this.modelValue = monEvent.target.value;
        let monEnvoi: number = +this.modelValue;
        this.modelValueChange.emit(monEnvoi);
        console.log(monEvent);
        console.log(monEvent.target.value);
    }
}
