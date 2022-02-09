import { constants } from 'os';
import React, {useState} from 'react';
import ApiHandler from './ApiHandler';

export class CartClass {


    apiHandler: ApiHandler;
   // items :Array<any> | undefined

    constructor() {

       this.apiHandler = new ApiHandler()
        
       //const  [this.items, setItems]   = useState([])

     //  this.state =  [this.items, setItems]
       


    }





   
    // add an item to cart 
    // parameter: an item name
    addToCart = (itemName = '') => {

      let reqBody = {
            "namn": itemName
        }

        this.apiHandler.setUpConnection("POST", "varukorg", null, null, null, reqBody) 
        
        // execute the call
        var res = this.apiHandler.coonectTopApi();

        // handle the promsie of the response
        res.then(async (val) => {  // if the promise is fullfilled 

            console.log(val); // log the reponse data  

            // update the basked icons with items number

            const cartItems =  await this.countItems()   

            document.querySelector("#basket")?.setAttribute("value", cartItems.toString());

            // if error get received, display it to client
            if (val.name || val.message) {
                alert(val.message);

                // if we have a valid response with the item added then update the html buttons
            } else if (val.length > 0) {

                // hide add to cart button
                document.querySelector("#" + itemName)?.querySelector(".addToCart")?.setAttribute("style", "block");

                // show remove from cart button  
                document.querySelector("#" + itemName)?.querySelector(".removeFromCart")?.setAttribute("style", "block");
            }

        });
    }


        // change itemsqty
    // parameter: an item name
    changeQty = async (itemName = '', qty = 0) => {

        let reqBody = {
              "namn": itemName,
              "qty": qty
          }
  
          this.apiHandler.setUpConnection("POST", "changeCartQty", null, null, null, reqBody) 
          
          // execute the call
          var val = await this.apiHandler.coonectTopApi();
  
          // handle the promsie of the response
         // res.then((val) => {  // if the promise is fullfilled 
  
              console.log(val); // log the reponse data  
  
  
              // if error get received, display it to client
              if (val.name || val.message) {
                  alert(val.message);
  
                  // if we have a valid response with the item added then update the html buttons
              } else if (val) {
  

                console.log(val)
                 return val
                // update total price
      
              }
  
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
 /*        // setup required settings to our api call
        this.apiHandler.fetchInfo.method = "GET";
        this.apiHandler.fetchInfo.endpoint = "varukorg";
        this.apiHandler.fetchInfo.paramName = "";
        this.apiHandler.fetchInfo.paramValue = "";
        this.apiHandler.fetchInfo.page = "shopping-cart";

        // const token = AuthUser.getToken()

     
 */   
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

        console.log(val);

        // if error get received, display it to client
        if (val.name || val.message) {
            alert(val.message);

            // check if we have a valid data response witch is either an array of items or an empty array
        } else if (Array.isArray(val)) {

            // render the product items to dom

            console.log(val)
         
            return val

            //return this.renderItem(val);
        }
        // });
    }


    // a method to render the array data reponse witch as  html objects

    renderItem = async (Data: any = [], refresh = true) => {

/*         let output: any = []

        // clean the dom
      //
        // check if we have en empty data items 
       // if (Data.length == 0) {
       ////     document.querySelector("main")!.innerHTML = '<b>No Products Found!</b>';
       // }

        // otherwise loop through our data array 
       // else
         Data.forEach((el: any) => {

            // console.log(el)


            // set up default values for buttons: add to cart/ remove from cart
            var addToCartBtn = "none";
            var removeFromCartBtn = "block";



            // check if item is in varokurg or we are rendering varokurg items
            // if yes shows a remove From Cart button otherwise hide it
            removeFromCartBtn = el.productInVarukorg == 1 ||
                el.productInVarukorg == undefined ?
                "block" : "none";

            // check if item is in varokurg or we are rendering varokurg items
            // if yes shows a add to Cart button otherwise hide it
            addToCartBtn = el.productInVarukorg == 1 ||
                el.productInVarukorg == undefined ?
                "none" : "block"; 

            // render the buttons

            //var addToCartTag = <p><button className="addToCart" onClick={e => this.addToCart(el.namn)}    >Add to cart</button></p>;

       

            //output.push(innerHtml)
        })


      //  console.log(output)

        return output */
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

/*         // setup required settings to our api call
        this.apiHandler.fetchInfo.method = "GET";
        this.apiHandler.fetchInfo.endpoint = "countCartItems";
        this.apiHandler.fetchInfo.paramName = "";
        this.apiHandler.fetchInfo.paramValue = "";

        // const token = AuthUser.getToken() */

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
