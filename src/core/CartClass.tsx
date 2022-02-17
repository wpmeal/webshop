import { constants } from 'os';
import React, {useState} from 'react';
import ApiHandler from './ApiHandler';

export class CartClass {


    apiHandler: ApiHandler;

    constructor() {

       this.apiHandler = new ApiHandler()
        

       


    }





   
    // add an item to cart 
    // parameter: an item name
    addToCart = async (itemName = '') => {



        let result:boolean = false

      let reqBody = {
            "namn": itemName
        }

        this.apiHandler.setUpConnection("POST", "varukorg", null, null, null, reqBody) 
        const cartIcon:any = document.querySelector("#basket")
        
        // execute the call
        var val = await this.apiHandler.coonectTopApi();

        // // // console.log("addToCart")



            // // console.log(val); // log the reponse data  

     

            // if error get received, display it to client
            if (val.name || val.message) {
                
                alert(val.message);

                // if we have a valid response with the item added then update the html buttons
            } else {

                result =  true

         

            }

        //});
        return result


    }


        // change itemsqty
    // parameter: an item name
    changeQty = async (itemName = '', qty = 0) => {

        let result:boolean = false

        let reqBody = {
              "namn": itemName,
              "qty": qty
          }
  
          this.apiHandler.setUpConnection("POST", "changeCartQty", null, null, null, reqBody) 
          
          // execute the call
          var val = await this.apiHandler.coonectTopApi();
  
  
  
              // // console.log(val); // log the reponse data  
  
  
              // if error get received, display it to client
              if (val.name || val.message) {
                // // console.log("not success!")

                  alert(val.message);
  
                  // if we have a valid response with the item added then update the html buttons
              } else if (val) {

                // // console.log("success!")
                 result = true 

                // // console.log(val)
                // update total price
      
              }

              return result

  
        //  });
      }

    // a method to remove item form cart
    // parameters: itemName: an item name, page: page name.
    removeFromCart = async (itemName = '', page = '') =>  {

        //let items:Array<any> = []

        this.apiHandler.setUpConnection("DELETE", "varukorg", "name", itemName) 

        // execute the call
        var result = await this.apiHandler.coonectTopApi();

            // if error get received, display it to client
            if (result.name || result.message) {
              
                alert(result.message);

                // check if we have a valid data reponse witch is either an array of items or an empty array
            } else if (Array.isArray(result)) {

                return result

            }
    }


    /*
    Get items of varukorg from backend
   */
    getVarokurgItems = async () => {

      const header = {
            //    'Authorization': "Bearer "+token,
            'Content-Type': 'application/json'
        };

        // setup required settings to our api call
        this.apiHandler.setUpConnection("GET", "varukorg", null, null, header) 

        // execute the call
        var val = await this.apiHandler.coonectTopApi();

        // handle the promsie of the response
        //res.then((val) => {

         //console.log(val);

        // if error get received, display it to client
        if (val.name || val.message) {

            alert(val.message);

            return null

            // check if we have a valid data response witch is either an array of items or an empty array
        } else if (Array.isArray(val)) {

            // render the product items to dom

            // // console.log(val)
         
            return val

            //return this.renderItem(val);
        }
        // });
    }


    changeItemQty = async (e:any, namn: any, qty: any) => {

        e.preventDefault()

        if(qty > 0){    

       return await this.changeQty(namn, qty)

        }

       // this.removeFromCart(namn, qty)
    }

    // Count items in cart
    countItems = async () => {


        const header = {
            //    'Authorization': "Bearer "+token,
            'Content-Type': 'application/json'
        };

        // setup required settings to our api call

        this.apiHandler.setUpConnection("GET", "countCartItems", null, null, header) 

        // execute the call
        var result = await this.apiHandler.coonectTopApi();

        return result.cartItemsNum

    }


}

export default CartClass;
