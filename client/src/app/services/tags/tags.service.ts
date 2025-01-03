import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITag } from '@interfaces/tag.interface';

@Injectable()
export class TagsService {
  constructor(private http: HttpClient) {}

  getTags() {
    return this.http.get<ITag[]>('/api/tags');
  }
}
