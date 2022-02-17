import UserClass from "./UserClass";
import Redirect from 'react-router'

// a class to handle the api
export default class ApiHandler {
    fetchInfo: { baseUrl: string; method: string; endpoint: string; headers: { 'Content-Type': string; 'Accept'?: string; 'Authorization'?: string }, paramName: string; paramValue: string; requestBody: any; page: string; };
    //  authUser: AuthUser;

    token = null

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

        let token = UserClass.getToken()
        if (token) {
            this.fetchInfo.headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }


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
    setUpConnection = (method: string, endpoint: string, paramName?: any, paramValue?: any, headers?: any, requestBody?: any) => {

        // setup required settings to our api call
        this.fetchInfo.method = method;
        this.fetchInfo.endpoint = endpoint;
        this.fetchInfo.paramName = paramName;
        this.fetchInfo.paramValue = paramValue;
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


        const res = await fetch(
            url,
            init
        );

        const result = await res.json();

        return result



    }



}







