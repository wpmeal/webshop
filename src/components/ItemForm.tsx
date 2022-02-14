import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserClass from "../core/UserClass";
import { userCtx } from "../App";
import ProductClass from "../core/ProductClass";
import { useNavigate } from "react-router-dom";


export default function ItemForm(props:any) {

  const userCtxConsumer = useContext(userCtx)

  console.log(props)

  const [name, setName] = useState("");
  const [pris, setPris] = useState("");
  const [bild, setBild] = useState("");
  const [stock, setStock] = useState("");

  const [redirect1, setRedirect1] = useState(false);


  const navigate = useNavigate();





  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({username: null, address:null });
  const [displayForm, setDisplayForm] = useState(false);


  

  const userClass = new UserClass()


  const productClass = new ProductClass()

  

  function validateForm() {
    return name.length > 0 && pris.length > 0 && bild.length > 0 && stock.length > 0;
  }

 async function handleSubmit(event:any) {
   event.preventDefault();

 const result = await productClass.updateItem(name, pris, bild, stock)



  if(!result.error){

    console.log(result)
    window.location.reload();
  
    // save token received from backend 
   // await userClass.saveToken(result.token)

    // setDisplayForm(false)

   //  userCtxConsumer.username =  result.username
    // userCtxConsumer.role =  result.role
 

    // setLoggedInUser({
    //  username: result.username,
    //  address: result.address
    //})

   // if(userCtxConsumer.role == "admin"){
    //  window.location.reload()
   // }


 
}else{ // otherwise error occurs, display it!!

    setError(result.message)

} 
  }


  useEffect(  () => {
    if(props.item){
      setName(props.item.namn)
      setPris(props.item.pris)
      setBild(props.item.bild)
      setStock(props.item.stock)
    }

  }, [props])

  return (


    <div className="Login">{displayForm}


   {!displayForm && <Form onSubmit={handleSubmit}>
        <Form.Group  controlId="name">
          <Form.Label>Name:&nbsp;</Form.Label>
          {props.item && 
          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled
          /> }
          {!props.item && 
           <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> 
           }
        </Form.Group>
        <Form.Group  controlId="pris">
          <Form.Label>Pris:&nbsp;</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={pris}
            onChange={(e) => setPris(e.target.value)}
          />
        </Form.Group>
        <Form.Group  controlId="bild">
          <Form.Label>Bild:&nbsp;</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={bild}
            onChange={(e) => setBild(e.target.value)}
          />
        </Form.Group>
        <Form.Group  controlId="stock">
          <Form.Label>Stock:&nbsp;</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Group>
        <Button data-testid="UpdateItemBtn" size="lg" type="submit" disabled={!validateForm()}>
          Update/Create
        </Button>
        <b>{error}</b>

      </Form>
  }

      
  

</div>


  );
}