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
//const { comparePassword } = require('../utility/bcrypt');


// Calling Express Lib
const app = express();

// Our express app should parse only json request/response  
app.use(express.json());

//app.use(express.static(__dirname));


// open database json file or create a one if it doesn't exist.
const adapter = new FileSync('products.json');
// calling lowdb with a product.json as the resource file
const database = lowdb(adapter);

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const {user} = require('./middleware/auth')


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
            qty: element.qty,
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


function isInStock(product){

 let qty = product.qty

   if(qty == undefined){

    throw new Error("Quantity finns inte i DB!");
  
   }

   let result = qty > 0 ? true : false 

  return result

}


function detuctFrmStock(product){

    let qty = product.qty
   
      if(qty == undefined){
   
       throw new Error("Quantity finns inte i DB!");
     
      }


      if( qty == 0)
      throw new Error("Out Of Stock!");


      let result = (qty > 0) ? (--qty) : 0

      const updatedProduct = database.get("products").find({namn: product.namn}).assign({
        qty: result

      }).write()

      if (!updatedProduct.namn)
      throw new Error("Kunna inte uppdatera produktet qty!");

    // console.log(updatedProduct)
   
     return updatedProduct
   
   }

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

        // Is in Stock
        if(!isInStock(productInDB))  
        throw new Error("Out Of Stock!");

          // Detuct an item from qty 
        // const updatedProduct =  detuctFrmStock(productInDB)


        // get the same product if it is already there in varukorg 
        const productInVarukorg = database.get("varukorg").find({ namn: product.namn }).value();


        productInDB.qty2 = 1

       // console.log(productInDB)


        // If not the same product is in varkorgu, then add the requested one and return them all otherwise just return existed products of varukorg
        const addToVarukorg = (!productInVarukorg) ? database.get("varukorg").push(productInDB).write() :
            database.get("varukorg").find({namn: productInVarukorg.namn}).assign({
                qty2: ++productInVarukorg.qty2
        
              }).write()

         // add  a product to varukorg
        // const addToVarukorg = database.get("varukorg").push(updatedProduct).write() 

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
app.get("/api/varukorg/",  (request, response) => {
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


/* 
* Get matched credentials  for a user from db
* Params: credentialsDb: an obj with username and password
* Return: user from db that matches the credentials
*/
function getCredentialsDB(credentials){

    const credentialsDb = database.get('staff')
    .find({ username: credentials.username })
    .value();
  
  if (!credentialsDb) {
    throw new Error("Fel användarnamn/lösenord!");
  
  }
  
  return credentialsDb;
  
  }
  
  /* 
  * Check if credentials match the username and encrypted password in db
  * Params: credentialsDb: an obj with username and password
  * Return: user from db that matches the credentials
  */
  async function checkCredentials(credentials) {
  
    let result = false;
    // find the credintilas in  db
    const credentialsDb = getCredentialsDB(credentials);
    // reassign  encrypted password 
    const hashedDbPassword = credentialsDb.password;
     // log request password 
    console.log("Password from user: " + credentials.password);
    // log  encrypted password
    console.log("Hashed Password: " + hashedDbPassword);
   // compare if request password matches the encrypted password
    const comparePasswordResult = await comparePassword(credentials.password, hashedDbPassword);
     // log the comparing result
    console.log("Compare Password: " + comparePasswordResult);
    // if the comparing result is false throw en error
    if (!comparePasswordResult) {
      throw new Error("Fel användarnamn/lösenord!");
    }
    // return credentials for positive checking 
    return result = credentialsDb;;
  
  }

/*
* ComparePassword
* params: unhashed password, hashed password
* return boolean 
*/

//const saltRounds = 10;

async function comparePassword(password, hash) {
  // compare hashed pass to human pass 
  const isTheSame = await bcrypt.compare(password, hash);
  return isTheSame;
}
/* 
* Login
* Endpoint: /login/
* Base /api/ 
*/
app.post("/api/login/", async (request, response) => {

    let result = null;

    try {
      // Reassign the request body  
      const credentials = request.body;
  
      // Check credentials result
      const credentialsDB = await checkCredentials(credentials); 
   
      // Log loggedIn user
      console.log('User', credentialsDB.username);
  
      // Sign loggedIn user using jwt  
      const token = jwt.sign({ id: credentialsDB.id }, 'a1b1c1', {
        expiresIn: 6000 //Går ut om 10 minuter 
      });
      // reassign the token of signed user 
      result = token;
  
      // catch any throwable error from CheckCredentials or jwt.sign 
    } catch (e) {
      // log error to server  
      console.log(e.message);
  
      // assign catched error as json obj
      result = {
        "error": e.name,      
        "message": e.message
      };
  
    }
   // return result
    response.json(result);
  
  
});

// start a new server on port:8000
app.listen(8000, () => {
    console.log('Server started');
    // write an empty Varukorg array to json file
    database.defaults({ varukorg: [] }).write();
});