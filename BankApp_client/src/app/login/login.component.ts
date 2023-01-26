import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = 'your perfect banking partner'
  accounts='enter your acno here'
 /* acno=''
  pwd=''*/

  loginForm=this.fb.group({//model
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  })

  constructor(private fb:FormBuilder,private router:Router ,private ds:DataService) { }

  ngOnInit(): void {
  }
  userDetails:any={
    1000:{acno:1000,username:'sofi',password:1000,balance:5000},
    1001:{acno:1001,username:'achu',password:1001,balance:5000},
    1002:{acno:1002,username:'anju',password:1002,balance:5000},

  }

  acnoChange(event:any){
    this.loginForm.value.acno=event.target.value
    
  }

  pswdChange(event:any){
  this.loginForm.value.pwd=event.target.value

  }


  login(){
    if(this.loginForm.valid){
      let acno = this.loginForm.value.acno;
      let pwd = this.loginForm.value.pwd;  
   const result=this.ds.login(acno,pwd)
     .subscribe((result:any)=>{
      localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
      localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
      localStorage.setItem('token',JSON.stringify(result.token))

      alert(result.message)
      this.router.navigateByUrl('dashboard')
     },
     result=>{
      alert(result.error.message)
     }
     )
  }

}
}


