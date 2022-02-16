import React, { Component } from 'react';
import ApiHandler from './ApiHandler';
import CartClass from './CartClass';
import UserClass from './UserClass';

export class ProductClass {
   


    apiHandler: ApiHandler;

    Cart: CartClass;

    
    constructor(){

         this.Cart = new CartClass()

         this.apiHandler = this.Cart.apiHandler

    } 

   /*
    get all products from backend
    */
    getProdducts = async () => {


        this.Cart.apiHandler.setUpConnection("GET", "products") 

        const basketIcon:any =   document.querySelector("#lblCartCount")

        // execute the call
        var val =  await this.apiHandler.coonectTopApi();

        // handle the promsie of the response
       // res.then((val:any) => {

            // console.log(val);

            // if error get received, display it to client
            if (val.name || val.message) {
                alert(val.message);

                // check if we have a valid data reponse witch is either an array of items or an empty array
            } else if (Array.isArray(val)) {
      

             return val

            }

        //});
    }



    updateItem = async  (name:any, pris:any, bild:any, stock:any) => {

      const token = UserClass.getToken()

      if(!token){
        throw new Error("U need to log in first as admin to perform this action!")
      }

    // reassign item data
    let item = {
        "name": name,
        "pris": pris,
        "bild": bild,
        "stock": stock
      };
  

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer "+token

      }
   
      this.apiHandler.setUpConnection('POST','updateItem', null, null, headers,  item)
  
      // execute connection to backend  
      const data = await this.apiHandler.coonectTopApi()
  
      // log response data
      // console.log(data);
  
      // return response data 
      return data;
  
    }

// delete item
    deleteItem = async  (name:any) => {

      const token = UserClass.getToken()

      if(!token){
        throw new Error("Display login form")
      }


      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer "+token

      }
   
      this.apiHandler.setUpConnection('DELETE','deleteItem', "name", name, headers)
  
      // execute connection to backend  
      const data = await this.apiHandler.coonectTopApi()
  
      // log response data
      // console.log(data);
  
      // return response data 
      return data;
  
    }
}

export default ProductClass;
