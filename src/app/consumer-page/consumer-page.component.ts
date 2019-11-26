import { Component, OnInit } from '@angular/core';

import { ConsumerService } from '../consumer.service';
import { Consumer } from './consumer';
import { Transaction } from '../transaction-page/transaction';

@Component({
  selector: 'app-consumer-page',
  templateUrl: './consumer-page.component.html',
  styleUrls: ['./consumer-page.component.css']
})
export class ConsumerPageComponent implements OnInit {

  public consumers:Consumer[];
  public upView:Transaction[];
  public editId:Number;
  public consumer_Name:String;
  public consumer_Location:String;
  public phone_Number:Number;
  public consumer_Email:String;
  public consumer_Name1:String;
  public consumer_Location1:String;
  public phone_Number1:Number;
  public consumer_Email1:String;
  public consId: String;
  public previousDate: Date;
  public previousRecord: Number;
  public currentDate: Date;
  public currentRecord: Number;
  public consumpt: Number;
  public duepaymentDate: Date;
  public caDue: Number;
  public unpaidMonth: Number;
  public upConsumers = new Array;
  public upId = new Array;

  constructor(public consumerService:ConsumerService) { }

  ngOnInit() {
    this.getConsumers();
  }

  getConsumers() {
    this.consumerService.getConsumers().subscribe((data) => {
      this.consumers = data;
    });
  }
  addConsumer(){
    var consumer = new Consumer();
    consumer.name = this.consumer_Name;
    consumer.location = this.consumer_Location;
    consumer.phoneNo = this.phone_Number;
    consumer.email = this.consumer_Email;
  
    this.consumerService.addConsumer(consumer)
    .subscribe((data) => {
      console.log(data);
      this.getConsumers();
    });
  }


  addTransaction(){
    var transaction = new Transaction();
    transaction.consumerId = this.consId;
    transaction.previous_date = this.previousDate;
    transaction.previous_record = this.previousRecord;
    transaction.current_date = this.currentDate;
    transaction.current_record = this.currentRecord;
    transaction.consumption = this.consumpt;
    transaction.due_payment_date = this.duepaymentDate;
    transaction.current_amount_due = this.caDue;
    transaction.unpaid_month = this.unpaidMonth;
    this.consumerService.addTransaction(transaction)
    .subscribe((data) => {
      console.log(data);
      // this.getTransactions();
    });
  }

  getData(id){
    this.consumerService.getData(id).subscribe((data) => {
    //this.users = data;
    this.upConsumers = data;
    console.log(data);
      });
    }
  
    getId(id){
      this.consumerService.getId(id).subscribe((data) => {
      //this.users = data;
        this.upId = data;
        console.log(data);
      });
    }

      getView(id){
        this.consumerService.getView(id).subscribe((data) => {
        //this.users = data;
          this.upView = data;
          console.log(data);
        });
      }   

  updateConsumer(id){
    var consumer = new Consumer();
    consumer.name = this.consumer_Name1;
    consumer.location = this.consumer_Location1;
    consumer.phoneNo = this.phone_Number1;
    consumer.email = this.consumer_Email1;

    this.consumerService.updateConsumer(consumer, id)
    .subscribe((data) => {
      console.log(data);
      this.getConsumers();
    });
  }
  deleteConsumer(id){
    if(confirm("Are you sure to delete this record?")) {
      this.consumerService.deleteConsumer(id)
      .subscribe((data) => {
        console.log(data);
        this.getConsumers();
      });
    }
  }
}
