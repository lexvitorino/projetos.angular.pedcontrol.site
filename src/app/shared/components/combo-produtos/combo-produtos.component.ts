import { Component, OnInit, ViewEncapsulation, Input, forwardRef, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Produtos } from 'src/app/pages/produtos/produtos.model';
import { ProdutosService } from 'src/app/pages/produtos/produtos.service';
import { FuncoesService } from '../../utils/funcoes.service';

@Component({
    selector: "app-combo-produtos",
    templateUrl: "./combo-produtos.component.html",
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ComboProdutosComponent),
            multi: true
        }
    ]
})
export class ComboProdutosComponent
    implements ControlValueAccessor, OnInit {
    @Input() id;
    @Input() name;
    @Input() required;
    @Input() disabled;
    @Input() _internalValue;

    @Output() outData = new EventEmitter();

    public dados: Produtos[];

    public touched = false;

    public onChange: any = _ => {
        /*Empty*/
    };
    public onTouched: any = () => {
        /*Empty*/
    };

    constructor(
        private produtosService: ProdutosService,
        private funcoesService: FuncoesService
    ) {
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

    ngOnInit() {
        this.produtosService.get().subscribe(data => {
            this.dados = data['data']
        });
    }

    public selected() {
        if (this.funcoesService.isNotUndefinedOrNull(this.internalValue)) {
            this.outData.emit(this.dados.find(c => c.id === this.internalValue));
        }
    }

    //////////////////////////////////
    // ControlValueAccessor interface
    //////////////////////////////////
    writeValue(value: any) {
        if (value === undefined || value === null) {
            this.internalValue = "";
            return;
        }

        this.internalValue = value;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        const self = this;
        this.onTouched = (arg: any) => {
            self.touched = true;
            fn(arg);
        };
    }
}
