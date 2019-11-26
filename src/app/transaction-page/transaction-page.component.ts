import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../transaction.service';
import { Transaction } from './transaction';
 import { Consumer } from '../consumer-page/consumer';
 
@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit {

  public transactions:Transaction[];
  public upTransView:Consumer[];
  public editId:Number;
  public previousDate: Date;
  public previousRecord: Number;
  public currentDate: Date;
  public currentRecord: Number;
  public consumpt: Number;
  public duepaymentDate: Date;
  public caDue: Number;
  public unpaidMonth: Number;
  public previousDate1: Date;
  public previousRecord1: Number;
  public currentDate1: Date;
  public currentRecord1: Number;
  public consumpt1: Number;
  public duepaymentDate1: Date;
  public caDue1: Number;
  public unpaidMonth1: Number;
  public upTrans = new Array;
  // public upTransView = new Array;
  public upConsumers = new Array;

  constructor(public transactionService:TransactionService) { }

  ngOnInit() {
    this.getTransactions();
    // this.getConsumers();
  }

  // getConsumers() {
  //   this.transactionService.getConsumers().subscribe((data) => {
  //     this.consumers = data;
  //   });
  // }

  getTransactions() {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
    });
  }
 
 

  getTran(id){
    this.transactionService.getTran(id).subscribe((data) => {
    //this.users = data;
    this.upTrans = data;
    console.log(data);
    // alert(id);
      });
    }

    getTranView(id){
      this.transactionService.getTranView(id).subscribe((data) => {
      //this.users = data;
      this.upTransView = data;
      console.log(data);
        });
      } 
     
  updateTransaction(id){
    var transaction = new Transaction();
    transaction.previous_date = this.previousDate1;
    transaction.previous_record = this.previousRecord1;
    transaction.current_date = this.currentDate1;
    transaction.current_record = this.currentRecord1;
    transaction.consumption = this.consumpt1;
    transaction.due_payment_date = this.duepaymentDate1;
    transaction.current_amount_due = this.caDue1;
    transaction.unpaid_month = this.unpaidMonth1;

    this.transactionService.updateTransaction(transaction, id)
    .subscribe((data) => {
      console.log(data);
      this.getTransactions();
    });
  }
  deleteTransaction(id){
    this.transactionService.deleteTransaction(id)
    .subscribe((data) => {
      console.log(data);
      this.getTransactions();
    });
  }
}
