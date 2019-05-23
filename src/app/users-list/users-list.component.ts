import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit {
  usersList: any[];

  private usersSub: Subscription;
  private listSub: Subscription;

  //Pagination part
  config: any;
  collection: any;

  isVisible: boolean;


  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsersList(1);
  }

  getUsersList(currentPage) {
    this.usersService.getUsers(currentPage);
    this.usersSub = this.usersService.usersListener().subscribe(
      (users: any) => {
        this.usersList = users;
      }
    );
    this.listSub = this.usersService.usersListListener().subscribe(
      (usersList: any) => {
        this.config = {
          itemsPerPage: usersList.per_page,
          currentPage: usersList.page,
          totalItems: usersList.total
        }
        this.isVisible = true;
      }
    );
  }

  pageChanged(e) {
    this.config.currentPage = e;
    this.getUsersList(this.config.currentPage);
  }

}
