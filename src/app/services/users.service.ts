import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';
import { IUser } from '../interfaces/iuser.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

private httpClient = inject(HttpClient);
private baseUrl: string = 'https://peticiones.online/api/users';

getAllObservable(page:number): Observable<IResponse> {
  return this.httpClient.get<IResponse>(`${this.baseUrl}?page=${page}`);
}

getById(_id: string): Promise<IUser> {
  return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`));
}

delete(_id: string): Promise<IUser> {
  return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`));
 }
update(user: IUser): Promise<IUser> {

  return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${user._id}`, user));}

insert(user: IUser){
 return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, user));
}

}
