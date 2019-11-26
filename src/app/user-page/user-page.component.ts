import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { User } from './user';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  public users:User[];
  public editId:Number;
  public user_Name:String;
  public user_Username:String;
  public user_Password:String;
  public user_Name1:String;
  public user_Username1:String;
  public user_Password1:String;
  public upUsers = new Array;

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;

    });
  }
  addUser(){
    var user = new User();
    user.name = this.user_Name;
    user.username = this.user_Username;
    user.password = this.user_Password;
  
    this.userService.addUser(user).subscribe((data) => {
      console.log(data);
        this.getUsers();
        // alert('Data Inserted!');
        this.user_Name="";
        this.user_Username="";
        this.user_Password="";
    });
  }

  getData(id){
    this.userService.getData(id).subscribe((data) => {
      this.upUsers = data;
      });
  }
     
  updateUser(id){
    var user = new User();
    user.name = this.user_Name1;
    user.username = this.user_Username1;
    user.password = this.user_Password1;

    this.userService.updateUser(user, id)
    .subscribe((data) => {
      console.log(data);
      this.getUsers();
    });
  }
  deleteUser(id){
    if(confirm("Are you sure to delete this record?")) {
      this.userService.deleteUser(id)
      .subscribe((data) => {
      console.log(data);
      this.getUsers();
      });
    }
  }
}
