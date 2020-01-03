import {Component, Injectable, OnInit} from '@angular/core';
import {User} from 'src/User';
import {ConnectorService} from '../connector.service';

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css']
})

export class ConnectorComponent implements OnInit {

  users: User[];
  error: string;

  constructor(private connectorService: ConnectorService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.connectorService.getAllUsers()
      .subscribe((data: User[]) => {
          this.users = data;
          console.log('Users: ', this.users);
        },
        error => this.error = error);
  }

  createUser(userName: string) {
    const newUser = new User();
    newUser.name = userName;
    this.connectorService.createUser(newUser)
      .subscribe(it => this.users.push(it));
  }

  deleteUser(userId: number) {
    console.log('userid: ', userId);
    this.users = this.users.filter(user => user.id !== userId);
    this.connectorService.deleteUserById(userId)
      .subscribe();
  }
}
