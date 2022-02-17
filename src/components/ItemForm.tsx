import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProductClass from "../core/ProductClass";
import { useRecoilState } from "recoil";
import { itemState } from "../atoms/ItemState";


export default function ItemForm(props: any) {



  const [name, setName] = useState("");
  const [pris, setPris] = useState("");
  const [bild, setBild] = useState("");
  const [stock, setStock] = useState("");

  const [error, setError] = useState("");

  const productClass = new ProductClass()

  const [item, setItem]: any = useRecoilState(itemState)


  function validateForm() {
    return name.length > 0 && parseInt(pris) > 0 && bild.length > 0 && parseInt(stock) > 0;
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      const result = await productClass.updateItem(name, pris, bild, stock)


      if (!result.error) {

        // console.log(result)

        setItem(result)


      } else { // otherwise error occurs, display it!!

        setError(result.message)

      }
    } catch (e: any) {

      setError(e.message)

    }
  }

  function setvalues() {
    if (props.item) {
      setName(props.item.namn)
      setPris(props.item.pris)
      setBild(props.item.bild)
      setStock(props.item.stock)
    } else {
      setName("")
      setPris("")
      setBild("")
      setStock("")
    }
  }

  useEffect(() => {

    setvalues()

  }, [props])

  return (

    <div className="AddItemForm">

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:&nbsp;</Form.Label>
          {props.item &&
            <Form.Control
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled
            />}
          {!props.item &&
            <Form.Control
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          }
        </Form.Group>
        <Form.Group controlId="pris">
          <Form.Label>Pris:&nbsp;</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={pris}
            onChange={(e) => setPris(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="bild">
          <Form.Label>Bild:&nbsp;</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={bild}
            onChange={(e) => setBild(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="stock">
          <Form.Label>Stock:&nbsp;</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="submit">
          <Form.Label>&nbsp;</Form.Label>
          <Button data-testid="UpdateItemBtn" size="lg" type="submit" disabled={!validateForm()}>
            {props.item && "Update"} {!props.item && "Create"}
          </Button>
        </Form.Group>
        <b>{error}</b>
      </Form>

    </div>

  );
}