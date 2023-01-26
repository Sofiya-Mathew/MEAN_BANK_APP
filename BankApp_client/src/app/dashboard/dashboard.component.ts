import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  //login name display
  user='';

  acno = '';
  // pwd = '';
  // amount = '';

  // acno1 = '';
  // pwd1 = '';
  // amount1 = '';

  constructor(private ds: DataService, private router:Router,private fb:FormBuilder) {
    this.user=this.ds.currentUser;
    // this.SystemDate=new Date()
    if(localStorage.getItem('currentUser')){
      this.user=JSON.parse(localStorage.getItem('currentUser')|| '')
    } 
  }

  ngOnInit(): void { 
    if(!localStorage.getItem('currentAcno')){
      alert('please login first')
      this.router.navigateByUrl('')
    }
  }
  depositForm=this.fb.group({//model
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  withdrawForm=this.fb.group({//model
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })




  deposit() {
    if(this.depositForm.valid){
      var acno=this.depositForm.value.acno;
      var pwd=this.depositForm.value.pwd;
      var amount=this.depositForm.value.amount;
      this.ds.deposit(acno,pwd,amount)
      .subscribe((result:any)=>{
        alert(result.message)
      },
      result=>{
        alert(result.error.message)
      }
      )
  
    }
  }

  withdraw() {
    if(this.withdrawForm.valid){
      var acno=this.withdrawForm.value.acno1;
      var pwd=this.withdrawForm.value.pwd1;
      var amount=this.withdrawForm.value.amount1;
    this.ds.withdraw(acno,pwd,amount)
    .subscribe((result:any)=>{
      alert(result.message)
    },
    result=>{
      alert(result.error.message)
    }
    )
      } 
     }


logout(){
  localStorage.removeItem('currentAcno')
  localStorage.removeItem('currentUser')
  localStorage.removeItem('token')

  this.router.navigateByUrl('')
}

delete(){
  this.acno=JSON.parse(localStorage.getItem('currentAcno')||'')
}

onCancel(){
  this.acno='';
}
onDelete(event:any){
this.ds.deleteAcc(event)
  .subscribe((result:any)=>{
    alert(result.message)
   this.logout()
  },
  result=>{
    alert(result.error.message)
  }
  )
}
}
