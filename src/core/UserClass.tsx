import ApiHandler from "./ApiHandler";

/*
* A Class to authenticate and  authorise the user
*/
export default class UserClass {


  initConnection:ApiHandler

  // initilize ConnectionClass 
  constructor() {

   this.initConnection   = new ApiHandler()

  }

  // save login token as session item  
  saveToken = (user:any) => {

       let userStr= JSON.stringify(user)

       sessionStorage.setItem('user', userStr);

  }

  // get token from session storage
 static getToken = () => {

    let token = null;

    if (sessionStorage.getItem('user')) {

      let user:any = sessionStorage.getItem('user')

       user = JSON.parse(user) 

       token= user.token

    }

    return token;

  }

  // delete token from session storage
  static deleteToken = () => {


    sessionStorage.removeItem('user');


  }

  /*
  * Login method
  * params: username, password
  * return token/error as json
  */
  login = async (username:string, password:string) => {

    // reassign credentials
    let credentials = {
      "username": username,
      "password": password
    };

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
 
    this.initConnection.setUpConnection('POST','login', null, null, headers,  credentials)

    // execute connection to backend  
    const data = await this.initConnection.coonectTopApi()

    // log response data
    // console.log(data);

    // return response data 
    return data;

  }

   /*
  * isLogin method
  * params: token
  * return token/error as json
  */
   getLoggedInUser = () => {

 let user = { username: "", address: "", role: "" }


    if (sessionStorage.getItem('user')) {

      let user2:any = sessionStorage.getItem('user')

       user = JSON.parse(user2) 

    }
    
    return user

  }
}
