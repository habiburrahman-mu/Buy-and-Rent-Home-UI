import { HttpParams } from "@angular/common/http";
import { PaginationParameter } from "../models/PaginationParameter";
import { LazyLoadEvent } from "primeng/api";
import { PrimeNgPaginatorEventParams } from "../models/primeNgPaginatorEventParams";

export class Mapper {
    static paginationParameterToHttpParams(paginationParameter: PaginationParameter) {
        let queryParams = new HttpParams({
            fromObject:
            {
                currentPageNo: paginationParameter.currentPageNo,
                pageSize: paginationParameter.pageSize,
                sortBy: paginationParameter.sortBy,
                isDescending: paginationParameter.isDescending,
                searchField: paginationParameter.searchField,
                searchingText: paginationParameter.searchingText,
            }
        });
        return queryParams;
    }

    static pTableLazyLoadEventToPaginationParameter(event: LazyLoadEvent) {
        let paginationParams: PaginationParameter = {
            currentPageNo: Math.ceil(event.first!/event.rows!) + 1,
            pageSize: event.rows!,
            sortBy: '',
            isDescending: false,
            searchField: '',
            searchingText: ''
        };
        return paginationParams;
    }

    static paginatorEventToPaginationParameter(event: PrimeNgPaginatorEventParams) {
        let paginationParams: PaginationParameter = {
            currentPageNo: event.page + 1,
            pageSize: event.rows,
            sortBy: '',
            isDescending: false,
            searchField: '',
            searchingText: ''
        };
        return paginationParams;
    }
}
