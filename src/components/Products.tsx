import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ApiHandler from '../core/ApiHandler'
import ProductClass from '../core/ProductClass';

function Products() {


  const [name, setName] = useState('')

  const [items, setItems]: Array<any> = useState([])

  const [products, setProducts]: Array<any> = useState([])



  const [error, setError] = useState("");


  const productClass = new ProductClass

  //let products: []

  async function initProductsClass() {

    let products = await productClass.getProdducts();

    setProducts(products)

    setItems(products)

  }

  useEffect(() => {

    initProductsClass()

  }, [])

  function validateForm() {
    return name.length >= 0;
  }

  async function handleSubmit(event: any) {

    console.log(products)

    event.preventDefault()
    var myPattern = new RegExp('(\\w*' + name + '\\w*)', 'gi');

    let filteredItems = products.filter((el: any) => {

      let result = el.namn.match(myPattern);

      return result

    })
    setItems(filteredItems)
  }


  return (
    <>
      <section>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="filter">
            <Form.Control
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
            />
          </Form.Group>

          <Button size="lg" type="submit" disabled={!validateForm()}>
            Filter By Name
          </Button>
        </Form>
      </section>
      <b>{error}</b>
      <section id="products">
        {items.length > 0 && items.map((el: any) => (
          <article key={el.namn}> <div><aside><img src={el.bild} /></aside>
            <p>{el.namn}</p>
            <p>{el.pris}</p>
            <p>Qty:{el.qty}</p>
          </div>
            <p><button className="addToCart" onClick={e => productClass.Cart.addToCart(el.namn)}    >Add to cart</button></p>
          </article>

        )
        )

        }
      </section>
    </>
  )

}

export default Products;
