const jwt = require("jsonwebtoken");

//import Db
const db = require("./db");

userDetails = {
  1000: {
    acno: 1000,
    username: "sofi",
    password: 1000,
    balance: 5000,
    transaction: [],
  },
  1001: {
    acno: 1001,
    username: "achu",
    password: 1001,
    balance: 5000,
    transaction: [],
  },
  1002: {
    acno: 1002,
    username: "anju",
    password: 1002,
    balance: 5000,
    transaction: [],
  },
};

register = (acno, username, password) => {
  return db.User.findOne({ acno }).then((User) => {
    if (User) {
      return {
        statusCode: 401,
        status: false,
        message: "user already registered",
      };
    } else {
      const newUser = new db.User({
        acno,
        username,
        password,
        balance: 0,
        transaction: [],
      });
      newUser.save();
      return {
        statusCode: 200,
        status: true,
        message: "successfully registered",
      };
    }
  });
};

login = (acno, pwd) => {
  return db.User.findOne({ acno, password: pwd })
  .then((User) => {
    if(User){
    currentUser = User.username;
    currentAcno = acno;
    const token = jwt.sign(
      {
        currentAcno:acno
      },
      "key2022"
    );
    return {
      statusCode: 200,
      status: true,
      message: "successfully login",
      currentAcno,
      currentUser,
      token,
    }
  }else{
    return {
      statusCode: 401,
      status: false,
      message: "incorrect passsword or username",
    }
  }
  })
 };


deposit = (acno, pwd, amt) => {
  var amount = parseInt(amt);
  return db.User.findOne({acno,password:pwd})
  .then((User)=>{
   if(User){
    User.balance += amount;
    User.transaction.push({
      type: "credit",
      amount,
    });
    User.save()
    return {
      statusCode: 200,
      status: true,
      message: `${amount} is credited ..and balance is ${User.balance}`,
    };
   }else{
    return {
            statusCode: 401,
            status: false,
            message: "incorrect passsword or username",
          };
   }
  })
};

withdraw = (acno, pwd, amt) => {
  var amount = parseInt(amt);
  console.log(typeof(amount));
  return db.User.findOne({acno,password:pwd})
  .then((User)=>{
   if(User){
    User.balance -= amount;
    User.transaction.push({
      type: "debit",
      amount,
    });
    User.save()
    return {
      statusCode: 200,
      status: true,
      message: `${amount} is debited ..and balance is ${User.balance}`
    };
   }else{
    return {
            statusCode: 401,
            status: false,
            message: "incorrect passsword or username",
          };
   }
  })

};

getTransaction = (acno) => {
  return db.User.findOne({acno})
  .then((User)=>{
    if(User){
      return {
        statusCode: 200,
        status: true,
        transaction: User['transaction'],
      };    
    }else{
      return {
        statusCode: 401,
        status: false,
        message: "cannot access transaction",
      };
    }
  })
  //return this.userDetails[acno]['transaction']
};
const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(users=>{
    if(users){
      return{ 
        statusCode:200,
        status:true,
        message:'user deleted'
    
      }
    }else{
      return{ 
        statusCode:402,
        status:false,
        message:'user not found'
    
      }
    }
  })
}

//export
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
};
