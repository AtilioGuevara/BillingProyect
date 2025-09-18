import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomixTableService {
  filterData(data: any[], searchText: string, filters: any): any[] {
    return data.filter(item => {
      const matchesSearch = Object.values(item).some((value: any) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      );

      const matchesFilters = Object.keys(filters).every(key => {
        const filter = filters[key];
        const value = item[key];
        if (filter.type === 'equals') {
          return value?.toString().toLowerCase() === filter.filter.toLowerCase();
        }
        if (filter.type === 'inRange') {
          if (filter.filterType === 'date') {
            const fromDate = new Date(filter.filter).getTime();
            const toDate = new Date(filter.filterTo || filter.filter).getTime();
            const itemDate = new Date(value).getTime();

            return itemDate >= fromDate && itemDate <= toDate;
          }
          return value >= filter.filter && value <= (filter.filterTo || value);
        }
        if (filter.type === 'contains') {
          if (filter.filter === null) {
            return true;
          }
          return value === filter.filter;
        }
        return true;
      });

      return matchesSearch && matchesFilters;
    });
  }

  sortData(data: any[], sortBy: any, sortDirection: 'asc' | 'desc'): any[] {
    if (!sortBy) return data;

    return data.sort((a: any, b: any) => {
      if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
