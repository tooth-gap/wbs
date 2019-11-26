import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import{UserService} from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(public router: Router,
    public userService: UserService) { }

  ngOnInit() {
  }
  // 
  doLogin(user,pass){
    this.userService.login(user,pass).subscribe((data)=>{
      if(data.length!=0){
        this.router.navigate(['/user'])
      }
      else{
        alert("Invalid");
      }
    });
  }
}
