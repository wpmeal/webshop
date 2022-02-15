import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ApiHandler from '../core/ApiHandler'
import ProductClass from '../core/ProductClass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/fontawesome-free-solid';
import ItemForm from './ItemForm';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../atoms/loggedInState';
import { itemState } from '../atoms/ItemState';


 function Products(props:any) {

  const [loggedInUser, setLoggedInUser]:any = useRecoilState(loggedInState);

  const [item, setItem]:any = useRecoilState(itemState)



  //const userCtxConsumer:any = useContext(userCtx)

 // const [user, setUser]:any = useState({}) 
/* 
console.log(userCtxConsumer)

const user = userCtxConsumer

//setUser(userCtxConsumer)


/*   userCtxConsumer.then( (resolve1:any) =>{
  
    setUser(resolve1)

  }) */ 


  const isAdminUser:boolean = loggedInUser.role =="admin" ? true : false

  const isAdminPage:boolean = props.page =="admin" ? true : false

  const isAdmin:boolean = isAdminUser && isAdminPage  ? true : false



  //const [isAdmin, setiAdmin]:boolean  = useState(false)

  const [name, setName] = useState('')

  const [items, setItems]: Array<any> = useState([])

  const [basketNum, setBasketNum] = useState(0)


  const [products, setProducts]: Array<any> = useState([])

  const icon: any = faShoppingBasket


  const [message, setMessage] = useState("");

  const [form, setForm] = useState(null);



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

  useEffect(() => {

   setItems((items:any) => [...items, item])

  }, [item])

  function validateForm() {
    return name.length >= 0;
  }

  async function addToCart(e: any, name: string) {

    e.preventDefault()

    console.log("addToCart clicked")

    let result = await productClass.Cart.addToCart(name)

    console.log(result)
    
    if (result) {

      const basketNum: any = await productClass.Cart.countItems()

      if (basketNum) {

        setBasketNum(basketNum)
        setMessage("New item is added to cart")

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
function editItem(e:any, item:string){

  e.preventDefault()

  console.log(item)

  const itemForm:any =<ItemForm item={item}/>

  setForm(itemForm)

}

function addItem(e:any){

  e.preventDefault()


  const itemForm:any =<ItemForm/>

  setForm(itemForm)

}
async function deleteItem(e:any, name:string){

  e.preventDefault()

  console.log(name)

  const result = await productClass.deleteItem(name)

  console.log(result)

  if(result.name != "Error"){

    const updatedItems = items.filter( (el:any) => { return el.namn != name })

    setItems(updatedItems)
    

  }
}

  return (

    <>
      <section>{form}
        {!isAdmin && <Link to="cart">
          <FontAwesomeIcon icon={icon} />

          <span className='badge badge-warning' id='lblCartCount' data-testid="basket" data-value={basketNum}>{basketNum}</span>
        </Link>}
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

        {isAdmin && <a href="#" onClick={(e)=>addItem(e)} >Add</a>}
      </section>
      {message &&  <b data-testid="message" data-value={message}></b>}
      <section id={!isAdmin ? "products" : "admin"}>
        {items.length > 0 && items.map((el: any) => (
          <article key={el.namn}> <div><aside><img src={el.bild} alt="product image" /></aside>
            <p>{el.namn}</p>
            <p>{!isAdmin && "Pris:"}&nbsp;{el.pris}</p>
            <p>{!isAdmin && "Qty:"}&nbsp;{el.stock}</p>
            {isAdmin && <p><a href="#" onClick={(e)=>editItem(e, el)} >Edit</a></p>}
            {isAdmin && <p><a href="#"  onClick={(e)=>deleteItem(e, el.namn)} >Delete</a></p>}

          </div>
          {!isAdmin && <p><button className="addToCart" onClick={ e => addToCart(e, el.namn)} data-testid="1AddToCart"  >Add to cart</button></p>}
          </article>

        )
        )

        }
      </section>
    </>

  )

}

export default Products;
