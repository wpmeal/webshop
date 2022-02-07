import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserClass from "../core/UserClass";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



  const userClass = new UserClass()
  

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

 async function handleSubmit(event:any) {
   event.preventDefault();

 const result = await userClass.login(email, password)


  if(!result.error){

    //resultDom.innerHTML = '';


    const token = result

    // save token received from backed 
    await userClass.saveToken(token)


   // location.href = "verifyBiljett.html";

 
}else{ // otherwise error occurs, display it!!

    setError(result.message)

} 
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group  controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button  size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>

      <b>{error}</b>
    </div>
  );
}