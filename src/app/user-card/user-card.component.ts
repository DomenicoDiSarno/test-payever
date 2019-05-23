import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.sass']
})
export class UserCardComponent implements OnInit {
  userID: any;
  user: any;
  isVisible: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private usersService: UsersService) { }

  ngOnInit() {
    this.userID = this.route.params.value.id;
    this.getUser(this.userID);
  }

  getUser(userID) {
    this.usersService.getUser(userID).subscribe(
      (user: any) => {
        this.user = user.data;
        this.isVisible = true;
      }
    );
  }

  back() {
    this.router.navigate(['']);
  }

}
