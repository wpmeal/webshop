import React, { useEffect, useState } from 'react';
import ApiHandler from '../ApiHandler'

function Products() {



  const [items, setItems] = useState([])

  const apiHandler = new ApiHandler()


  async function initProductsClass() {

    const products: any = await apiHandler.getProdducts();

    setItems(products)

  }

  useEffect(() => {

    initProductsClass()

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

export default Products;
