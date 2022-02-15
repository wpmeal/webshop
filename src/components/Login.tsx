import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserClass from "../core/UserClass";
import { userCtx } from "../App";

export default function Login() {

  const userCtxConsumer = useContext(userCtx)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({username: null, address:null });
  const [displayForm, setDisplayForm] = useState(false);


  

  const userClass = new UserClass()
  

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

 async function handleSubmit(event:any) {
   event.preventDefault();

 const result = await userClass.login(email, password)


  if(!result.error){

    console.log(result)
  
    // save token received from backend 
    await userClass.saveToken(result)

     setDisplayForm(false)

     userCtxConsumer.username =  result.username
     userCtxConsumer.role =  result.role
 

     setLoggedInUser({
      username: result.username,
      address: result.address
    })

    if(userCtxConsumer.role == "admin"){
    //  window.location.reload()
    }


 
}else{ // otherwise error occurs, display it!!

    setError(result.message)

} 
  }
  const getLoggedInUser = () => {

    //try{

   const user:any = userClass.getLoggedInUser()

   console.log(user)

   if(user.username){

   setDisplayForm(false)

   
   setLoggedInUser(user)

   userCtxConsumer.username =  user.username
   userCtxConsumer.role =  user.role

  


   // }catch(e:any){
   }else {

      setDisplayForm(true)


    //}
  }
  }
  useEffect(  () => {

    getLoggedInUser()

  }, [])

  return (
    <div className="Login">{displayForm}
  {loggedInUser.username &&
   <div className="userInfo"><label><a data-testid="username" href="#">{loggedInUser.username}</a></label><div><label>Address:&nbsp;</label><label>{loggedInUser.address}</label></div></div>}

   {displayForm && <Form onSubmit={handleSubmit}>
        <Form.Group  controlId="email">
          <Form.Label>Email:&nbsp;</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:&nbsp;</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button data-testid="loginBtn" size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <b>{error}</b>

      </Form>
  }

      
  

</div>


  );
}