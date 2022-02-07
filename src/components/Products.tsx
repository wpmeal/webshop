import React, { useEffect, useState } from 'react';
import ApiHandler from '../core/ApiHandler'
import ProductClass from '../core/ProductClass';

function Products() {



  const [items, setItems] = useState([])

  const productClass = new ProductClass


  async function initProductsClass() {

    const products: any = await productClass.getProdducts();

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
