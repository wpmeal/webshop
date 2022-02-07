import React, { useEffect, useState } from 'react';
import ApiHandler from '../core/ApiHandler'
import CartClass from '../core/CartClass';

export default function CartItems() {


    const [items, setItems] = useState([])

    const cartClass = new CartClass
  
  
    async function varokurgItems() {
  
      const varoItems: any = await cartClass.getVarokurgItems()
  
      setItems(varoItems)
  
    }
  
    useEffect(() => {
  
        varokurgItems()
  
    }, [])
  
  
  
    return (
      <> {items.length > 0 && items.map((el: any) => (
        el
      )
      )
  
      }
      </>
    )

}

