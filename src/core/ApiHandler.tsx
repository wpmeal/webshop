/*   
* API Varukorg uppgift  
* #NodeJs #LowDB #Json #RestApi #JS
* Coded By Omar Mahrous``
* Copyright © April 2021
*
*/

//import AuthUser from "./authUserClass";

// a class to handle the api
export default class ApiHandler {
    fetchInfo: { baseUrl: string; method: string; endpoint: string; headers: { 'Content-Type': string; 'Accept'?: string; 'Authorization'?: string }, paramName: string; paramValue: string; requestBody: any; page: string; };
    //  authUser: AuthUser;

    // let's construct it by setting default values to our api
    constructor() {
        // default values 
        this.fetchInfo = {
            baseUrl: '/api',
            method: "GET",
            endpoint: "products",
            headers: {
                'Content-Type': 'application/json'

            },
            paramName: "",
            paramValue: "",
            requestBody: "",
            page: ""
        };



    }

    // prepare api url with the help of our fetchinfo property
    // return a url string
    prepareUrl = () => {
        let url;
        url = this.fetchInfo.baseUrl +
            "/" + this.fetchInfo.endpoint;

        if (this.fetchInfo.paramName)
            url += "/" + this.fetchInfo.paramName;

        if (this.fetchInfo.paramValue)
            url += "/" + this.fetchInfo.paramValue;

        return url;

    }


    // Setup connection properties
    setUpConnection = (method: string, endpoint: string, paramName?: any, paramValue?: any, headers?:any, requestBody?:any ) => {

        // setup required settings to our api call
        this.fetchInfo.method = method;
        this.fetchInfo.endpoint = endpoint;
        this.fetchInfo.paramName = paramName;
        this.fetchInfo.paramValue = paramValue;
        this.fetchInfo.headers = headers ? headers : this.fetchInfo.headers 

        this.fetchInfo.requestBody = requestBody

    }


    // execute the connection to the api 
    coonectTopApi = async () => {
        const url = this.prepareUrl();
        let init: {
            "method": string,
            "headers": {},
            "body"?: string
        }
        init = {
            "method": this.fetchInfo.method,
            "headers": this.fetchInfo.headers,
            "body": ""


        }
        // add a body to our request only on POST method otherwise it will throw an exception
        if (this.fetchInfo.method == "POST") {
     
          init.body = JSON.stringify(this.fetchInfo.requestBody);

        } else {
            
            delete init.body;
        }


      //  console.log(init)   

             // exectute the connection to backedn api 
        const res = await fetch(
            url,
            init
        );
        // format the reponse as json
        return await res.json();

    }




}

// Initialize our class
var productsObj = new ApiHandler();






