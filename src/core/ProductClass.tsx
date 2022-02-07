import React, { Component } from 'react';
import ApiHandler from './ApiHandler';
import CartClass from './CartClass';

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
        // setup required settings to our api call
        this.apiHandler.fetchInfo.method = "GET";
        this.apiHandler.fetchInfo.endpoint = "products";
        this.apiHandler.fetchInfo.paramName = "";
        this.apiHandler.fetchInfo.paramValue = "";
        this.apiHandler.fetchInfo.page = "index";

        // execute the call
        var val =  await this.apiHandler.coonectTopApi();

        // handle the promsie of the response
       // res.then((val:any) => {

            console.log(val);

            // if error get received, display it to client
            if (val.name || val.message) {
                alert(val.message);

                // check if we have a valid data reponse witch is either an array of items or an empty array
            } else if (Array.isArray(val)) {

                // check how many items are in varukorg  by filtering the array of all products that 
                // have valid productInVarukorg property
                const basketitems = val.filter(el => { if (parseInt(el.productInVarukorg) == 1) return el; })

                // update the number of varukorg items on basket icon
                document.querySelector("#basket")?.setAttribute("value", basketitems.length.toString());

                // render the product items to dom
                return this.renderItem(val);

             //return val

            }

        //});
    }

     // a method to render the array data reponse witch as  html objects

     renderItem = async (Data: any = [], refresh = true) => {

        let output: any = []

        // clean the dom
     //   document.querySelector("main")!.innerHTML = "";

        // check if we have en empty data items 
        if (Data.length == 0) {
            document.querySelector("main")!.innerHTML = '<b>No Products Found!</b>';
        }

        // otherwise loop through our data array 
        else Data.forEach((el: any) => {

             console.log(el)


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

            var addToCartTag = <p><button className="addToCart" onClick={e => this.Cart.addToCart(el.namn)}    >Add to cart</button></p>;

         //   var removeFromCartTag = <p><button className="removeFromCart" onClick={e => this.Cart.removeFromCart(el.namn)}    >Remove from cart</button></p>;

            var innerHtml = <article key={el.namn}> <div><aside><img src={el.bild} /></aside>
                <p>{el.namn}</p>
                <p>{el.pris}</p>
                <p>Qty:{el.qty}</p>
                </div>
                {addToCartTag}
            </article>;


            output.push(innerHtml)
        })


        console.log(output)

        return output
    }


}

export default ProductClass;
