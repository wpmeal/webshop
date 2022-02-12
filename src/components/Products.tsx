import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ApiHandler from '../core/ApiHandler'
import ProductClass from '../core/ProductClass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/fontawesome-free-solid';


function Products() {

  const [name, setName] = useState('')

  const [items, setItems]: Array<any> = useState([])

  const [basketNum, setBasketNum] = useState(0)


  const [products, setProducts]: Array<any> = useState([])

  const icon: any = faShoppingBasket


  const [message, setMessage] = useState("");


  const productClass = new ProductClass

  //let products: []

  const none:any = {display:"block"}

  async function initProductsClass() {

    let products = await productClass.getProdducts();

    const cartItems = await productClass.Cart.countItems()

    console.log(cartItems)

    setBasketNum(cartItems)

    setProducts(products)

    setItems(products)

  }

  useEffect(() => {

    initProductsClass()

  }, [])

  function validateForm() {
    return name.length >= 0;
  }

  async function addToCart(e: any, name: string) {

    console.log("addToCart clicked")

    let result = await productClass.Cart.addToCart(name)

    console.log(result)
    
    if (result) {

      const basketNum: any = await productClass.Cart.countItems()

      if (basketNum) {

        setBasketNum(basketNum)
        setMessage("Item is added to cart.")

      }
    }
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
        <Link to="cart">
          <FontAwesomeIcon icon={icon} />

          <span className='badge badge-warning' id='lblCartCount' data-testid="basket" data-value={basketNum}>{basketNum}</span>
        </Link>
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
      <b style={none}>{message}</b>
      <section id="products">
        {items.length > 0 && items.map((el: any) => (
          <article key={el.namn}> <div><aside><img src={el.bild} alt="product image" /></aside>
            <p>{el.namn}</p>
            <p>{el.pris}</p>
            <p>Qty:{el.stock}</p>
          </div>
            <p><button className="addToCart" onClick={ async (e) => ( await addToCart(e, el.namn))} data-testid="AddToCart"  >Add to cart</button></p>
          </article>

        )
        )

        }
      </section>
    </>
  )

}

export default Products;
