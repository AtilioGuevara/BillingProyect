import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridSearchService {

  constructor() { }

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  setSearchText(searchText: string) {
    this.searchSubject.next(searchText);
  }
}
