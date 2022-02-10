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
  saveToken = (token:any) => {

    return new Promise((resolve, reject) => {

      sessionStorage.setItem('auth', token);

      resolve('Done');

    });

  }

  // get token from session storage
 static getToken = () => {

    let token = null;

    if (sessionStorage.getItem('auth')) {

      token = sessionStorage.getItem('auth');

    }

    return token;

  }

  // delete token from session storage
  deleteToken = () => {

    sessionStorage.removeItem('auth');

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

    // set connections settings 
  //  this.initConnection.fetchInfo.method = 'POST';
    //this.initConnection.fetchInfo.endpoint = 'login';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
 
    this.initConnection.setUpConnection('POST','login', null, null, headers,  credentials)

    // execute connection to backend  
    const data = await this.initConnection.coonectTopApi()

    // log response data
    console.log(data);

    // return response data 
    return data;

  }

   /*
  * isLogin method
  * params: token
  * return token/error as json
  */
   isLoggedIn = async () => {

    // reassign credentials

    const token = UserClass.getToken()

    if(!token){
      throw new Error("Display login form")
    }
   

    // set connections settings 
  //  this.initConnection.fetchInfo.method = 'POST';
    //this.initConnection.fetchInfo.endpoint = 'login';
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer "+token,
    }
 
    this.initConnection.setUpConnection('get','loggedInUser', "token", token, headers)

    // execute connection to backend  
    const data = await this.initConnection.coonectTopApi()

    // log response data

   if(data.error){
    throw new Error("Invalid Token! Display login form"+data.message)

   }

    // return response data 
    return data;

  }
}
