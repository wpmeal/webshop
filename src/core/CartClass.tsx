import React from 'react';
import ApiHandler from './ApiHandler';

export class CartClass {


    apiHandler: ApiHandler;

    constructor() {
        this.apiHandler = new ApiHandler()

    }

    // add an item to cart 
    // parameter: an item name
    addToCart = (itemName = '') => {

        // setup required settings to our api call
        this.apiHandler.fetchInfo.method = "POST";
        this.apiHandler.fetchInfo.endpoint = "varukorg";
        this.apiHandler.fetchInfo.paramName = "";
        this.apiHandler.fetchInfo.paramValue = "";

        // an item name to be added varukorg
        this.apiHandler.fetchInfo.requestBody = {
            "namn": itemName
        }

        // execute the call
        var res = this.apiHandler.coonectTopApi();

        // handle the promsie of the response
        res.then((val) => {  // if the promise is fullfilled 

            console.log(val); // log the reponse data  

            // update the basked icons with items number
            document.querySelector("#basket")?.setAttribute("value", val.length);

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

    // a method to remove item form cart
    // parameters: itemName: an item name, page: page name.
    removeFromCart = (itemName = '', page = '') => {

        // setup required settings to our api call
        this.apiHandler.fetchInfo.method = "DELETE";
        this.apiHandler.fetchInfo.endpoint = "varukorg";
        this.apiHandler.fetchInfo.paramName = "name";
        this.apiHandler.fetchInfo.paramValue = itemName;

        // execute the call
        var res = this.apiHandler.coonectTopApi();

        // handle the promsie of the response
        res.then((val) => {

            //log the response
            console.log(val);

            // if error get received, display it to client
            if (val.name || val.message) {
                alert(val.message);

                // check if we have a valid data reponse witch is either an array of items or an empty array
            } else if (Array.isArray(val)) {

                // if we remove items on index page update the display style of add/remove from cart plus basket icon buttons accordingly
                if (page == "index") {
                    //   if(document.querySelector("#" + itemName))
                    //document.querySelector("#" + itemName)!.querySelector(".addToCart")!.style.display = "block";
                    document.querySelector("#" + itemName)?.querySelector(".addToCart")?.setAttribute("style", "block");

                    document.querySelector("#" + itemName)?.querySelector(".removeFromCart")?.setAttribute("style", "none");
                    document.querySelector("#basket")?.setAttribute("value", val.length.toString());

                    // if we are removing on varokurg page then simply delete the article html obj from dom
                } else if (page == "shopping-cart") {

                    document.querySelector("#" + itemName)?.remove();

                    if (val.length == 0) { // if we removed the last item in varokurg
                        //  document.querySelector("main")?.innerHTML = "Varukorg är tom!";
                        document.querySelector("main")!.innerHTML = "Varukorg är tom!";
                    }
                }
            }

        });
    }


    /*
    Get items of varukorg from backend
   */
    getVarokurgItems = async () => {
        // setup required settings to our api call
        this.apiHandler.fetchInfo.method = "GET";
        this.apiHandler.fetchInfo.endpoint = "varukorg";
        this.apiHandler.fetchInfo.paramName = "";
        this.apiHandler.fetchInfo.paramValue = "";
        this.apiHandler.fetchInfo.page = "shopping-cart";

        // const token = AuthUser.getToken()

        this.apiHandler.fetchInfo.headers = {
            //    'Authorization': "Bearer "+token,
            'Content-Type': 'application/json'
        };

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

            return this.renderItem(val);
        }
        // });
    }


    // a method to render the array data reponse witch as  html objects

    renderItem = async (Data: any = [], refresh = true) => {

        let output: any = []

        // clean the dom
        document.querySelector("main")!.innerHTML = "";

        // check if we have en empty data items 
        if (Data.length == 0) {
            document.querySelector("main")!.innerHTML = '<b>No Products Found!</b>';
        }

        // otherwise loop through our data array 
        else Data.forEach((el: any) => {

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

            var addToCartTag = <p><button className="addToCart" onClick={e => this.addToCart(el.namn)}    >Add to cart</button></p>;

            var removeFromCartTag = <p><button className="removeFromCart" onClick={e => this.removeFromCart(el.namn)}    >Remove from cart</button></p>;

            var innerHtml = <article> <div><aside><img src={el.bild} /></aside>
                <p>{el.namn}</p>
                <p>{el.pris}</p></div>
                {addToCartTag}
                {removeFromCartTag}
            </article>;


            output.push(innerHtml)
        })


        console.log(output)

        return output
    }


}

export default CartClass;
