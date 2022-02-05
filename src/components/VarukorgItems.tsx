import React, { useEffect, useState } from 'react';
import ApiHandler from '../ApiHandler'

export default function VarukorgItems() {


    const [items, setItems] = useState([])

    const apiHandler = new ApiHandler()
  
  
    async function varokurgItems() {
  
      const varoItems: any = await apiHandler.getVarokurgItems()
  
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

