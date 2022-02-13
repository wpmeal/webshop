import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"

import CartItems from '../components/CartItems';

const res = [
  {
      namn: "Apple",
      pris: 23,
      bild: "/images/apple.jpg",
      stock: 45,
      qty: 2
  },
  {
      namn: "Apelsin",
      pris: 32,
      bild: "/images/apelsin.jpg",
      stock: 88,
      qty: 1
  }
]

describe('Test Cartitems Component', () => {

  beforeEach(async () => {

    const mockValue: any = {
      json: jest.fn().mockResolvedValue(res)
  }

  jest.spyOn(global, 'fetch').mockResolvedValue(mockValue)

    await act(async () => {
      render(<CartItems />);
    })

  })

  afterEach(() => {
    jest.restoreAllMocks();
  });


  it("Render cart items", async () => {
        const name = screen.getByText(/Apple/i)
        const pris = screen.getByText(/23/i)
        const qty = screen.getAllByTestId("qty")[0]


        expect(name).toBeInTheDocument()
        expect(pris).toBeInTheDocument()
        expect(qty).toHaveValue("2")
  })


  it("change cart item's qty such as 0 < qty", async () => {

  const qtyInput = screen.getAllByTestId("qty")[0]

  //userEvent.type(qtyInput, "2")


   await act( async ()=>{
    
    fireEvent.blur(qtyInput, {target: {value: '3'}})



})

expect(qtyInput).toHaveValue("3")

const error = screen.getByTestId("error")
expect(error).toBeEmptyDOMElement()  


 await act( async ()=>{
    
  fireEvent.blur(qtyInput, {target: {value: '0'}})


})

expect(qtyInput).toHaveValue("0")


expect(error).not.toBeEmptyDOMElement() 




})


it("remove cart item", async () => {




  expect(screen.queryByText(/Apple/i)).toBeInTheDocument()
  
  expect(screen.queryByText(/Apelsin/i)).toBeInTheDocument()


  const btn = screen.getAllByTestId("removeCartItem")[0]

  const res = [
    {
        namn: "Apelsin",
        pris: 32,
        bild: "/images/apelsin.jpg",
        stock: 88,
        qty: 1
    }
  ]
  const mockValue: any = {
    json: jest.fn().mockResolvedValue(res)
}

jest.spyOn(global, 'fetch').mockResolvedValue(mockValue)

  await act( async ()=>{
    
    userEvent.click(btn)
  
  
  })

  expect(screen.queryByText(/Apple/i)).not.toBeInTheDocument()

  expect(screen.queryByText(/Apelsin/i)).toBeInTheDocument()


})

it("calculate total price", async () => {

  const sum = res[0].pris * res[0].qty + res[1].pris * res[1].qty


  expect(screen.getByText(sum)).toBeInTheDocument() 
})

})