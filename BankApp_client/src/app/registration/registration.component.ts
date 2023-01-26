import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  /*uname = '';
  acno = '';
  pwd = '';*/

  //register model
  registerForm=this.fb.group({//model
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  })
//controll goes to register html
  constructor(private fb:FormBuilder, private ds: DataService,private router:Router ){}

  ngOnInit(): void {}

  register() {
    if(this.registerForm.valid){
    //validation form
    let uname = this.registerForm.value.uname;
    let acno = this.registerForm.value.acno;
    let pwd = this.registerForm.value.pwd;
    const result=this.ds.register(acno,uname,pwd)
    .subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message)
     })
  }
}
}