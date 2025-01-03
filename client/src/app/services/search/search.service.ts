import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResult } from '@common/interfaces/search-result.interface';
import { catchError, of } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  search(searchKeyword: string) {
    return this.http
      .get<SearchResult[]>(`api/search?keyword=${searchKeyword}`)
      .pipe(
        catchError((err) => {
          console.error(`Error occured when searching, ${err}`);

          return of(null);
        })
      );
  }
}
