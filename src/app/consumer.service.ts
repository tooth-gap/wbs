import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Consumer } from './consumer-page/consumer';
import { Transaction } from './transaction-page/transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
  // public url:string = "http://localhost:80";
  public url:string = "https://wbs-itsd.herokuapp.com/";
  public headers = new HttpHeaders().set('Content-Type','application/json')

  constructor(public http:HttpClient) { }

  getConsumers():Observable<Consumer[]> {
    return this.http.get<Consumer[]>(
      this.url + '/consumer'
    );
  }

  getTransactions():Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      this.url + '/transaction'
    );
  }

  addTransaction(transaction): Observable<any> {
    return this.http.post<any>(
      this.url + '/transaction',
      transaction, 
      { headers:this.headers }
    );
  }

  getData(id):Observable<Consumer[]> {
    return this.http.get<Consumer[]>(
      this.url + '/consumer/'+id
    );
  }

  getView(id):Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      this.url + '/transaction/consumer/'+ id
    );
  }

  getId(id):Observable<Consumer[]> {
    return this.http.get<Consumer[]>(
      this.url + '/consumer/'+id
    );
  }

  addConsumer(consumer): Observable<any> {
    return this.http.post<any>(
      this.url + '/consumer',
      consumer, 
      { headers:this.headers }
    );
  }
  
  updateConsumer(consumer: Consumer, id: string): Observable<Consumer> {
    return this.http.put<Consumer>(
      this.url + '/consumer/' + id,
      consumer, 
      { headers:this.headers }
    );
  }
  deleteConsumer(id: string){
    return this.http.delete(this.url + '/consumer/' + id);
  }
}
