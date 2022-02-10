import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserClass from "../core/UserClass";

export default function Login() {
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
  
    // save token received from backed 
    await userClass.saveToken(result.token)

     setDisplayForm(false)

     setLoggedInUser({
      username: result.username,
      address: result.address
    })




 
}else{ // otherwise error occurs, display it!!

    setError(result.message)

} 
  }
  const getLoggedInUser = async () => {

    try{

   const user:any = await userClass.isLoggedIn()

   //console.log(user)

   setDisplayForm(false)

   
   setLoggedInUser(user)


    }catch(e:any){

      console.log(e.message)
      setDisplayForm(true)


    }
  }

  useEffect(  () => {

    getLoggedInUser()

  }, [])

  return (
    <div className="Login">{displayForm}
  {loggedInUser.username &&
   <div className="userInfo"><label><a href="#">{loggedInUser.username}</a></label><div><label>Address:&nbsp;</label><label>{loggedInUser.address}</label></div></div>}

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
        <Button  size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <b>{error}</b>

      </Form>
  }

      
  

</div>


  );
}