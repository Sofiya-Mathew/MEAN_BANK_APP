import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  //to hold ac number
  acno:any;
  //to hold transaction
  transaction:any;

  constructor(private ds:DataService) {
    this.acno=JSON.parse(localStorage.getItem('currentAcno') || '')
    this.transaction=this.ds.getTransaction(this.acno)
    .subscribe((result:any)=>{
      this.transaction=result.transaction
    },
    result=>{
      alert(result.error.message)
    }
    )
   }

  ngOnInit(): void {
  }

}
