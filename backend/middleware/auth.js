const jwt = require('jsonwebtoken');

/* 
* user middleware
* Params: request, response, next
* used to authorize access to certain controllers
*/
 function user(request, response, next) {

  try {
    // receive the token of signed user from request
    const token = request.header('Authorization').replace('Bearer ', '');
    // log the token
    console.log(token);    
    //verigy the token using jwt;
    const data = jwt.verify(token, 'a1b1c1');
    // log the verified user 
    console.log('User middleware', data);
    // assign a new property to request obj with user id of verified user
      request.userId = data.id;
      // call the controller that is atttached with this middleware
      next();
    
  } catch(e) {
    // response with the catched error 
    response.status(401).
    json({
      "error": "tokenVerifyError",
      "message": "Permission Denied!"
       });
  }
}

exports.user = user;