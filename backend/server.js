/*   
* API Varukorg uppgift  
* #NodeJs #LowDB #Json #RestApi
* Coded By Omar Mahrous
* Copyright © April 2021
* Version.2
*/

// Including necessary libraries 
const lowdb = require('lowdb');
const express = require('express');
const FileSync = require('lowdb/adapters/FileSync');
const { request } = require('express');

// Calling Express Lib
const app = express();

// Our express app should parse only json request/response  
app.use(express.json());

//app.use(express.static(__dirname));


// open database json file or create a one if it doesn't exist.
const adapter = new FileSync('products.json');
// calling lowdb with a product.json as the resource file
const database = lowdb(adapter);

/* 
* Fetch all products from DB
* Endpoint: /products/
* Base /api/ 
*/
app.get('/api/products/', (request, response) => {

    // begin a try so the app doesn't crash when error happens and still response with valid json
    try {
        // get products array from db 
        const products = database.get("products").value();
        //console.log(products);

        // throw an error when it's not there!
        if (!products)
            throw new Error("Kunna inte hämta produkter!");

        var data = [];
        products.forEach(element => {
           
            // find if product exists in varokurg
           const getProductInVarukorg = database.get("varukorg").find({ namn: element.namn }).value();
           
           //  a new property to the json reponse that determine if product exists in varokurg or not
           const productInVarukorg = getProductInVarukorg == undefined ? 0 : 1;

           // add it to each product obj
           const el = {
            namn: element.namn,
            pris: element.pris,
            bild: element.bild,
            productInVarukorg: productInVarukorg
           }
             
            // build a new array to be used as a response json
            data.push(el);

        });        
   
        // response to the request in json format for products array
        response.json(data);

        // catch any error that might happen inside the try 
    } catch (e) {

        // return anyway a valid json response with the name and message to the error
        response.json({
            "name": e.name,
            "message": e.message
        });
    }

});

/* 
* Add a new product to Varukorg
* Endpoint: /varukorg/
* Base /api/ 
*/
app.post("/api/varukorg/", (request, response) => {

    try {
        // read the request body that contains the new product value
        const product = request.body;

        // Check if the product exist in DB
        const productInDB = database.get("products").find({ namn: product.namn }).value();
        if (!productInDB)
            // throw error if not
            throw new Error("Produktet finns inte!");

        // get the same product if it is already there in varukorg 
        const productInVarukorg = database.get("varukorg").find({ namn: product.namn }).value();


        // If not the same product is in varkorgu, then add the requested one and return them all otherwise just return existed products of varukorg
        const addToVarukorg = (!productInVarukorg) ? database.get("varukorg").push(productInDB).write() :
            database.get("varukorg").value();

        // If no products returned from varukorg there throw an error 
        if (!addToVarukorg)
            throw new Error("Kunna inte lägga produktet till varukorg!");

        // retrun varukorg items as a valid json response    
        response.json(addToVarukorg);

        // catch any error and reutrn it as valid json to the client   
    } catch (e) {
        response.json({
            "name": e.name,
            "message": e.message
        });
    }
});

/* 
* Remove item from db
* parameter: Product Name
* Endpoint: /varukorg/
* Base /api/ 
*/

app.delete("/api/varukorg/name/:name", (request, response) => {
    console.log(request.params.name);
    //const name = request.params.name;
    try {
        // read the name of product that is required to be removed from the request
        const name = request.params.name;

        //Check if the product exists in db
        const productInDB = database.get("products").find({ namn: name }).value();
        if (!productInDB)
            throw new Error("Produktet finns inte i produktersdatabas!");

        // delete the product from db    
        database.get("varukorg").remove({ namn: name }).write();

        // return a json response with all items of varukorg
        response.json(database.get("varukorg").write());

        // catch and throwable error and return a json response about that erro..
    } catch (e) {
        response.json({
            "name": e.name,
            "message": e.message
        });
    }

});

/* 
* get all items from varukorg
* Endpoint: /varukorg/
* Base /api/ 
*/
app.get("/api/varukorg/", (request, response) => {
    try {

        ProductsInVarukorg = database.get("varukorg").value();

        // check if no items in varukorg
       // if (ProductsInVarukorg.length == 0)
            // throw an empty Varukorg message 
      //      throw new Error("Varukorg är tom!");

        // otherwise return all items to the client
        response.json(ProductsInVarukorg);

    } catch (e) {
        response.json({
            "name": e.name,
            "message": e.message
        });
    }
});

// start a new server on port:8000
app.listen(8000, () => {
    console.log('Server started');
    // write an empty Varukorg array to json file
    database.defaults({ varukorg: [] }).write();
});