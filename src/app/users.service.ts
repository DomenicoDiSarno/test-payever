import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersURL= 'https://reqres.in/api/users';
  users: any[];
  usersList: any;
  updatedList = new Subject<any[]>();
  updatedUsers = new Subject<any[]>();

  constructor(private httpClient: HttpClient) { }

  usersListener() {
    return this.updatedUsers.asObservable();
  }

  usersListListener() {
    return this.updatedList.asObservable();
  }

  getUsers(currentPage) {
    return this.httpClient.get(this.usersURL + '?page=' + currentPage).subscribe(
      (users: any) => {
        this.usersList = users;
        this.users = users.data;
        this.updatedList.next(users);
        this.updatedUsers.next([...users.data]);
      }
    );
  }

  getUser(id) {
    return this.httpClient.get(this.usersURL + '/' + id);
  }

}
