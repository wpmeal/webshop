import React from 'react';
import { act, render, screen } from '@testing-library/react';
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


  it("change cart item's qty", async () => {

})


it("remove cart item", async () => {

})

it("calculate total price", async () => {

})

})