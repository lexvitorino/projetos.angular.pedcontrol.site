import { Component, OnInit, ViewEncapsulation, forwardRef, Input, Output, EventEmitter } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { NgbDatepickerI18n, NgbDateParserFormatter, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { I18n, CustomDatepickerI18n } from './i18n/CustomDatepickerI18n';
import { NgbDatePTParserFormatter } from './i18n/NgbDatePTParserFormatter';

const I18N_VALUES = {
    'pt-br': {
        weekdays: ['dom', 'seg', 'ter', 'qua', 'qui', 'sab', 'dom'],
        months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
};

@Component({
    selector: "app-data",
    templateUrl: "./data.component.html",
    styleUrls: ["./data.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DataComponent),
            multi: true
        },
        [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
        [{ provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter }],
        [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
    ]
})
export class DataComponent implements ControlValueAccessor, OnInit {
    @Input() id;
    @Input() name;
    @Input() required;

    @Input() _internalValue;

    @Output() executa = new EventEmitter();

    public touched = false;

    public onChange: any = _ => {
        /*Empty*/
    };
    public onTouched: any = () => {
        /*Empty*/
    };

    constructor() {
    }

    public ngOnInit() {
    }

    get internalValue() {
        return this._internalValue;
    }

    set internalValue(val: any) {
        if (val === undefined || val === null || val === "") {
            this._internalValue = "";
            this.onChange(undefined); // Value is rubbish, so don't send back to model propper
            return;
        }
        this._internalValue = val;
        this.onChange(this._internalValue); // Value is good!
    }

    //////////////////////////////////
    // ControlValueAccessor interface
    //////////////////////////////////
    public writeValue(value: any) {
        if (value === undefined || value === null) {
            this.internalValue = "";
            return;
        }

        this.internalValue = value;
    }

    public registerOnChange(fn: any) {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any) {
        const self = this;
        this.onTouched = (arg: any) => {
            self.touched = true;
            fn(arg);
        };
    }

    public setDisabledState?(isDisabled: boolean): void {
    }

    public getBlur() {
        this.executa.emit(this.internalValue);
    }
}
