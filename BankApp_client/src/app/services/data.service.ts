import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//global http header object
const options={
  headers:new HttpHeaders()
}


@Injectable({
  providedIn: 'root',
})
export class DataService {
  //login anme display
  currentUser: any;

  currentAcno:any;

  userDetails: any = {
    1000: {
      acno: 1000,
      username: 'sofi',
      password: 1000,
      balance: 5000,
      transaction: [],
    },
    1001: {
      acno: 1001,
      username: 'achu',
      password: 1001,
      balance: 5000,
      transaction: [],
    },
    1002: {
      acno: 1002,
      username: 'anju',
      password: 1002,
      balance: 5000,
      transaction: [],
    },
  };

  constructor(private http:HttpClient) {//http injection
   
  }

  register(acno: any, username: any, password: any) {
    const data={
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:3000/registration',data)

  }

  login(acno: any, pwd: any) {
    const data={
      acno,
      pwd
    }
   return this.http.post('http://localhost:3000/login',data)
  }

  getToken(){
    //fetch the token from localstorage
    const token=JSON.parse(localStorage.getItem('token')|| '')
    //generate request header
    let headers=new HttpHeaders()
    //append token inside header
    if(token){
     options.headers=headers.append('x-access-token',token)
    }
    return options
  }

  deposit(acno: any, pwd: any, amount: any) {
    const data={
      acno,
      pwd,
      amount
    }
   return this.http.post('http://localhost:3000/deposit',data,this.getToken())
  }

  withdraw(acno: any, pwd: any, amount: any) {
    const data={
      acno,
      pwd,
      amount
    }
   return this.http.post('http://localhost:3000/withdraw',data,this.getToken())

  }
  getTransaction(acno:any){
    const data={
      acno
     
    }
   return this.http.post('http://localhost:3000/transaction',data,this.getToken())

  }
  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  }

// saveDetails(){ //to store data to localstorage
//   if(this.userDetails){
//     localStorage.setItem('database',JSON.stringify(this.userDetails))
//   }
//   if(this.currentAcno){
//     localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
//   }
//   if(this.currentUser){
//     localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
//   }

// }

// getDetails(){
//   if(localStorage.getItem('database')){
//     this.userDetails=JSON.parse(localStorage.getItem('database') || '')
//   }


// }
// getcurrentUser(){
//   if(localStorage.getItem('currentUser')){
//     this.userDetails=JSON.parse(localStorage.getItem('currentUser') || '')
//   }

// }

// getcurrentAcno(){
//   if(localStorage.getItem('currentAcno')){
//     this.userDetails=JSON.parse(localStorage.getItem('currentAcno') || '')
//   }

// }


}

