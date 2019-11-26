import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Transaction } from './transaction-page/transaction';
import { Consumer } from './consumer-page/consumer';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public url:string = "http://localhost:80";
  public headers = new HttpHeaders().set('Content-Type','application/json')

  constructor(public http:HttpClient) { }

  getTransactions():Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      this.url + '/transaction'
    );
  }

  getConsumers():Observable<Consumer[]> {
    return this.http.get<Consumer[]>(
      this.url + '/consumer'
    );
  }

  getTran(id):Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      this.url + '/transaction/'+ id
    );
  }

  getTranView(id):Observable<Consumer[]> {
    return this.http.get<Consumer[]>(
      this.url + '/transaction/view/'+ id
    );
  }
  
  updateTransaction(transaction: Transaction, id: string): Observable<Transaction> {
    return this.http.put<Transaction>(
      this.url + '/transaction/' + id,
      transaction, 
      { headers:this.headers }
    );
  }
  deleteTransaction(id: string){
    return this.http.delete(this.url + '/transaction/' + id);
  }
}
