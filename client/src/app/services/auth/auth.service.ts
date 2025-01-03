import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegisterDto } from '@common/dtos/register.dto';
import { ILoginDto } from '@common/dtos/login.dto';
import { IRequestStatusDto } from '@common/dtos/request-status.dto';
import Cookies from 'universal-cookie';
import { IUser } from '@common/interfaces/user.interface';
import {
  debounceTime,
  firstValueFrom,
  lastValueFrom,
  of,
  Subscription,
  switchMap,
  take,
  throttleTime,
} from 'rxjs';
import { ITag } from '@common/interfaces/tag.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private cookies: Cookies = new Cookies();
  private userPreferences?: boolean;
  private waitingForResponse: boolean = false;
  constructor(private http: HttpClient) {}

  register(payload: IRegisterDto) {
    return this.http.post<IRequestStatusDto>('/api/auth/register', payload);
  }

  login(payload: ILoginDto) {
    return this.http.post<IRequestStatusDto>('/api/auth/login', payload);
  }

  isAuthenticated() {
    return !!this.cookies.get('jwt');
  }

  async userHasPreferences(): Promise<boolean> {
    if (this.userPreferences !== undefined) return this.userPreferences;

    if (!this.isAuthenticated()) return true;

    if (this.waitingForResponse) return false;

    this.waitingForResponse = true;
    const user = await firstValueFrom(this.getMe());
    this.userPreferences = user.tags && user.tags.length > 0;
    this.waitingForResponse = false;

    return this.userPreferences!;
  }
  updateUserPreferences(value?: boolean) {
    this.userPreferences = value;
  }

  isAdmin() {
    return this.http.get<boolean>('/api/auth/is-admin');
  }

  getMe() {
    return this.http.get<IUser>('/api/auth/me');
  }

  saveTags(tags: ITag[]) {
    return this.http.put('/api/auth/tags', { tags });
  }

  getUsers() {
    return this.http.get<IUser[]>('/api/auth/users');
  }

  createEntityAsAdmin(entity: any) {
    return of(null);
  }

  deleteEntityAsAdmin(entityId: number) {
    return this.http.delete(`/api/auth/${entityId}`);
  }

  updateEntityAsAdmin(entity: any) {
    return this.http.put(`/api/auth/${entity.id}`, entity);
  }
}
