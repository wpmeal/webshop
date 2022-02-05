/*   
* API Varukorg uppgift  
* #NodeJs #LowDB #Json #RestApi #JS
* Coded By Omar Mahrous``
* Copyright © April 2021
*
*/

// a class to handle the api
export default class ApiHandler {
    fetchInfo: { baseUrl: string; method: string; endpoint: string; headers: { 'Content-Type': string; }; paramName: string; paramValue: string; requestBody: any; page: string; };

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

    // execute the connection to the api 
    coonectTopApi = async () => {
        const url = this.prepareUrl();
      let init : {
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
        if (this.fetchInfo.method == "POST"){
            init.body = JSON.stringify(this.fetchInfo.requestBody);

        }else{
            delete init.body; 
        }    

        // exectute the connection to backedn api 
        const res = await fetch(
            url,
            init
        );
        // format the reponse as json
        return await res.json();

    }

    // a method to render the array data reponse witch as  html objects
    
    renderItem = async (Data:any = [], refresh = true) => {

        let output:any = []

        // clean the dom
        document.querySelector("main")!.innerHTML = "";

        // check if we have en empty data items 
        if (Data.length == 0) {
            document.querySelector("main")!.innerHTML = '<b>No Products Found!</b>';
        }

        // otherwise loop through our data array 
        else Data.forEach((el:any) => {

           // console.log(el)

                // create an article html obj that will represent each items/product to the client/browser
              //  const articleHtmlObj = document.createElement("article");


                // set a uninqe id that match the name of the product
              //  articleHtmlObj.setAttribute("id", el.namn);

              //  articleHtmlObj.props("id", el.namn)

                // set up default values for buttons: add to cart/ remove from cart
                var addToCartBtn = "none";
                var removeFromCartBtn = "block";

                // prepare the html content of artice html obj
                // an render the item's name, price and pic.



              

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
                    
                var addToCartTag = <p><button className="addToCart" onClick = {e => this.addToCart(el.namn)}    >Add to cart</button></p>;
     
                var removeFromCartTag = <p><button className="removeFromCart" onClick = {e => this.removeFromCart(el.namn)}    >Remove from cart</button></p>;

                          var innerHtml = <article> <div><aside><img src={el.bild}/></aside>
                          <p>{el.namn}</p>
                          <p>{el.pris}</p></div>
                          {addToCartTag}
                          {removeFromCartTag}
                          </article>;

                          

                // assign html content to our parent article obj
              //  articleHtmlObj.innerHTML = innerHtml1;

                // append each article html item to dom
              //  document.querySelector("main")?.appendChild(articleHtmlObj);

              output.push(innerHtml)
            })


            console.log(output)

            return output
    }
    

    // add an item to cart 
    // parameter: an item name
    addToCart = (itemName = '') => {

        // setup required settings to our api call
        this.fetchInfo.method = "POST";
        this.fetchInfo.endpoint = "varukorg";
        this.fetchInfo.paramName = "";
        this.fetchInfo.paramValue = "";

        // an item name to be added varukorg
        this.fetchInfo.requestBody = {
            "namn": itemName
        }

        // execute the call
        var res = this.coonectTopApi();

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
                document.querySelector("#" + itemName)?.querySelector(".addToCart")?.setAttribute("style",  "block");

                // show remove from cart button  
                document.querySelector("#" + itemName)?.querySelector(".removeFromCart")?.setAttribute("style",  "block");
            }

        });
    }

    // a method to remove item form cart
    // parameters: itemName: an item name, page: page name.
    removeFromCart = (itemName = '', page = '') => {

        // setup required settings to our api call
        this.fetchInfo.method = "DELETE";
        this.fetchInfo.endpoint = "varukorg";
        this.fetchInfo.paramName = "name";
        this.fetchInfo.paramValue = itemName;

        // execute the call
        var res = this.coonectTopApi();

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
                    document.querySelector("#" + itemName)?.querySelector(".addToCart")?.setAttribute("style",  "block");

                    document.querySelector("#" + itemName)?.querySelector(".removeFromCart")?.setAttribute("style",  "none");
                    document.querySelector("#basket")?.setAttribute("value", val.length.toString());

                    // if we are removing on varokurg page then simply delete the article html obj from dom
                } else if (page == "shopping-cart") {

                    document.querySelector("#" + itemName)?.remove();

                    if (val.length == 0) { // if we removed the last item in varokurg
                      //  document.querySelector("main")?.innerHTML = "Varukorg är tom!";
                      document.querySelector("main")!.innerHTML = "Varukorg är tom!" ;
                    }
                }
            }

        });
    }
    /*
    get all products from backend
    */
    getProdducts = async () => {
        // setup required settings to our api call
        this.fetchInfo.method = "GET";
        this.fetchInfo.endpoint = "products";
        this.fetchInfo.paramName = "";
        this.fetchInfo.paramValue = "";
        this.fetchInfo.page = "index";

        // execute the call
        var val =  await this.coonectTopApi();

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

    /*
    Get items of varukorg from backend
   */
    getVarokurgItems = async () => {
        // setup required settings to our api call
        this.fetchInfo.method = "GET";
        this.fetchInfo.endpoint = "varukorg";
        this.fetchInfo.paramName = "";
        this.fetchInfo.paramValue = "";
        this.fetchInfo.page = "shopping-cart";

        // execute the call
        var val = await this.coonectTopApi();

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
}

// Initialize our class
var productsObj = new ApiHandler();






