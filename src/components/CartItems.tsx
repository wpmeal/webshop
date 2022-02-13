import React, { useEffect, useState } from 'react';
import CartClass from '../core/CartClass';

export default function CartItems() {


  const [items, setItems]: Array<any> = useState([])

  const [refresh, setRefresh]: Array<any> = useState(false)


  const [totalPrice, setTotalPrice] = useState(0)

  const [error, setError]:any = useState(null)



  const cartClass = new CartClass

  function calTotalPrice(varoItems: any) {
    let totalPrice1 = 0

    varoItems.map((el: any) => {
      let a = parseInt(el.pris) * parseInt(el.qty)
      totalPrice1 += a
      console.log(totalPrice1)
      //    return sum
    })

    return totalPrice1
  }

  async function varokurgItems() {

    const varoItems: any = await cartClass.getVarokurgItems()


    const total = calTotalPrice(varoItems)

    setTotalPrice(total)

    setItems(varoItems)

  }

  useEffect(() => {

    varokurgItems()

    setRefresh(false)

  }, [refresh])


  const removeFrmCart = async (e: any, name: string) => {

    e.preventDefault()

    const items = await cartClass.removeFromCart(name)

    const total = calTotalPrice(items)

    setTotalPrice(total)

    setItems(items)

    //  console.log(items)

    //setItems(items)

  //  setRefresh(true)

  }

  const changeItemQty = async (e: any, name: string) => {

    e.preventDefault()

    const result: any = await cartClass.changeItemQty(e, name, e.target.value)

    if (result) {
      setError(null)

      setRefresh(true)

    }else {
      setError("can not change qty of cart item")
    }


  }



  return (
    <> <b data-testid="error">{error}</b>
    {items.length > 0 && items.map((el: any) => (
      <article><p><img width="50px" height="50px" src={el.bild} /></p>
        <p>{el.namn}</p>
        <p>{el.pris}</p>

        <p><input name="changeItemQty" data-testid="qty" onBlur={e => changeItemQty(e, el.namn)} defaultValue={el.qty}/></p>


        <p><button className="removeFromCart" data-testid="removeCartItem"  onClick={e => removeFrmCart(e, el.namn)}    >Remove from cart</button></p>
      </article>

    )
    )
    }
     { items.length > 0 &&  <article><p>Total Price:</p><p>{totalPrice.toString()}</p></article>}

    </>
  )

}

