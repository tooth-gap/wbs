import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from './user-page/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // public url:string = "http://localhost:80";
  public url:string = "https://wbs-itsd.herokuapp.com/";
  public headers = new HttpHeaders().set('Content-Type','application/json')

  constructor(public http:HttpClient) { }

  login(username,password):Observable<any[]>{
    return this.http.get<any[]>(
      this.url+'/user/'+username+'/'+password
    )
  }
  
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(
      this.url + '/user'
    );
  }

  getData(id):Observable<User[]> {
    return this.http.get<User[]>(
      this.url + '/user/'+id
    );
  }

  addUser(user): Observable<any> {
    return this.http.post<any>(
      this.url + '/user',
      user, 
      { headers:this.headers }
    );
  }
  updateUser(user: User, id: string): Observable<User> {
    return this.http.put<User>(
      this.url + '/user/' + id,
      user, 
      { headers:this.headers }
    );
  }
  deleteUser(id: string){
    return this.http.delete(this.url + '/user/' + id);
  }
}
