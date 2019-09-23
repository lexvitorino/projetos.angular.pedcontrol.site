import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NumberService {

    constructor() {
    }

    private isUndefinedOrNull(obj: any): boolean {
        if (obj === undefined || obj === null) {
            return true;
        }
        return false;
    }

    public isPositive(value) {
        if (this.isUndefinedOrNull(value)) {
            return false;
        }
        return parseFloat(value) > 0;
    }

    public isNotPositive(value) {
        if (this.isUndefinedOrNull(value)) {
            return true;
        }
        return parseFloat(value) < 0;
    }

    public round(value, precision): number {
        const multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    public getCurrency(value, decimais) {
        if (this.isUndefinedOrNull(value)) {
            return value;
        }
        return value.toLocaleString('pt-br', {minimumFractionDigits: decimais});
    }
}
