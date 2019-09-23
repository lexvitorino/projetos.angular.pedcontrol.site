import { Injectable, ViewChild } from '@angular/core';
import * as moment from "moment";
import { NumberService } from './number.service';
import { StringService } from './string.service';

declare var $;

@Injectable({
    providedIn: 'root'
})
export class DatatablesService {

    private dataTable: any;
    private i18n = {
        emptyTable: 'Nenhum registro encontrado',
        info: 'Mostrando de _START_ até _END_ de _TOTAL_ registros ',
        infoEmpty: 'Mostrando 0 até 0 de 0 registros',
        infoFiltered: '(Filtrados de _MAX_ registros)',
        infoPostFix: '',
        infoThousands: '.',
        lengthMenu: '_MENU_ resultados por página',
        loadingRecords: 'Carregando...',
        processing: 'Processando...',
        zeroRecords: 'Nenhum registro encontrado',
        search: 'Pesquisar',
        select: {
            rows: '%d linhas selecionadas'
        },
        paginate: {
            next: 'Próximo',
            previous: 'Anterior',
            first: 'Primeiro',
            last: 'Último'
        },
        aria: {
            sortAscending: ': Ordenar colunas de forma ascendente',
            sortDescending: ': Ordenar colunas de forma descendente'
        }
    };

    constructor(
        private numberService: NumberService,
        private stringService: StringService
    ) { }

    public monta(dataTable: any,
        cols: any,
        dataSet: any[],
        callback: any,
        columnOrder: number = 0,
        orientationOrder: string = "desc") {
        this.dataTable = dataTable;
        dataTable.DataTable({
            data: dataSet,
            columns: cols,
            scrollCollapse: true,
            scrollX: true,
            destroy: true,
            deferRender: true,
            select: { style: 'single' },
            processing: true,
            language: this.i18n,
            colReorder: false,
            responsive: true,
            rowCallback: function (row, data, index) {
                $("td", row).unbind("click");
                $("td", row).bind("click", function () {
                    $(".table td").removeClass("info");
                    $("td", row).addClass("info");
                    callback(data);
                });
                return row;
            },
            sPaginationType: "full_numbers",
            aaSorting: [[columnOrder, orientationOrder]]
        });
    }

    public selected() {
        return this.dataTable.row({ selected: true });
    }

    public getDataID() {
        return {
            data: 'id', title: 'ID', width: '10%'
        };
    }

    public getDataString(colData, colTitle, colWidth = "") {
        return {
            data: colData,
            title: colTitle,
            width: colWidth
        };
    }

    public getDataStringFormat(colData, colTitle, colWidth, searchvalue, newvalue) {
        return {
            data: colData,
            title: colTitle,
            width: colWidth,
            render: (data, type) => {
                if (type === "sort" || type === 'type') {
                    return data;
                } else {
                    if (this.stringService.isEmpty(data)) {
                        return data;
                    }
                    return (type === "display" || type === "filter")
                        ? data.replace(searchvalue, newvalue)
                        : data;
                }
            }
        };
    }

    public getDataBool(colData, colTitle, colWidth = "") {
        return {
            data: colData,
            title: colTitle,
            width: colWidth,
            render: function (data, type) {
                if (type === "sort" || type === 'type') {
                    return data;
                } else {
                    return (type === "display" || type === "filter") && data === "S"
                        ? "Sim"
                        : "Não";
                }
            }
        };
    }

    public getDataDouble(colData, colTitle, colDecimais = 0, colWidth = "") {
        return {
            data: colData,
            title: colTitle,
            width: colWidth,
            className: "text-right",
            render: (data, type) => {
                if (type === "sort" || type === 'type') {
                    return data;
                } else {
                    return this.numberService.getCurrency(data, colDecimais);
                }
            }
        };
    }

    public getDataDateTime(colData, colTitle, colFormat = "DD/MM/YYYY hh:mm:ss", colWidth = "") {
        return {
            data: colData,
            title: colTitle,
            width: colWidth,
            render: function (data, type) {
                return type === "display" || type === "filter"
                    ? moment(data).format(colFormat)
                    : data;
            }
        };
    }

    public getDataSelect(colData, colTitle, colSelect, colWidth = "") {
        return {
            data: colData,
            title: colTitle,
            width: colWidth,
            render: function (data, type) {
                if (type === "sort" || type === 'type') {
                    return data;
                } else {
                    if ((type === "display" || type === "filter")) {
                        let r = "";
                        colSelect.get.filter(e => {
                            if (e.id === data) {
                                r = e.descricao;
                            }
                        });
                        return r !== "" ? r : data;
                    } else {
                        return data;
                    }
                }
            }
        };
    }

    public getDataObject(colObject, colData, colTitle, colWidth = "") {
        return {
            data: function (row, type) {
                if (type === "display" && row[colObject] !== null) {
                    return row[colObject][colData].trim();
                } else {
                    return "";
                }
            },
            title: colTitle,
            width: colWidth
        };
    }

}
