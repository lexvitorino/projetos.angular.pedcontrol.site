import { Pipe, PipeTransform } from "@angular/core";
import { FuncoesService } from '../utils/funcoes.service';

@Pipe({
  name: "removeExcluidos",
  pure: false
})
export class RemoveExcluidosPipe implements PipeTransform {
  constructor(private funcoesService: FuncoesService) {}

  transform(value: any, args?: any): any {
    if (this.funcoesService.isUndefinedOrNull(value) || value.lenght === 0) {
      return value;
    }

    return value.filter(v => v["sitReg"] !== "E");
  }
}
