import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"

import CartItems from '../components/CartItems';
import { RecoilRoot } from 'recoil';
import Login from '../components/Login';
import { RecoilObserver } from '../RecoilObserver';
import { loggedInState } from '../atoms/loggedInState';
import { BrowserRouter } from 'react-router-dom';

const res = [
  {
    namn: "Apple",
    pris: 22,
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
const res2 = { username: "omar", address: "Kastvindsgatan 2C lgh 2343, 41714, Gothenburg", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Il9EV…DAyfQ.wbFkOKAKwsh5s8kRLHIfHEs2Y_X6raAMcOAvnqKsqEA", role: "admin" }

describe('Test Cartitems Component', () => {

  beforeEach(async () => {

    const mockValue: any = {
      json: jest.fn().mockResolvedValue(res)
    }

    jest.spyOn(global, 'fetch').mockResolvedValue(mockValue)

    const onChange = jest.fn();

    await act(async () => {
      render(
        <RecoilRoot>
          <BrowserRouter>
            <RecoilObserver node={loggedInState} onChange={onChange} />
            <Login />
            <CartItems />
          </BrowserRouter>
        </RecoilRoot>

      );
    })

  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Login a user in order to update Recoil state", async () => {


    const username = screen.getByLabelText(/Email/i)

    const password = screen.getByLabelText(/password/i)

    expect(username).toBeInTheDocument()

    expect(password).toBeInTheDocument()


    userEvent.type(username, "omar")

    userEvent.type(password, "pwd456")


    expect(username).toHaveValue('omar')

    expect(password).toHaveValue('pwd456')

    const button = screen.getByTestId('loginBtn')



    const mockValue: any = {
        json: jest.fn().mockResolvedValue(res2)
    }

    jest.spyOn(global, 'fetch').mockResolvedValue(mockValue)

    await act(async () => {


        userEvent.click(button)


    })

    const res_username = screen.getByText(/omar/i);
    const address = screen.getByText(/Kastvindsgatan 2C lgh 2343, 41714, Gothenburg/i);

    expect(res_username).toBeInTheDocument();
    expect(address).toBeInTheDocument();




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


    await act(async () => {

      fireEvent.blur(qtyInput, { target: { value: '3' } })



    })

    expect(qtyInput).toHaveValue("3")

    const error = screen.getByTestId("error")
    expect(error).toBeEmptyDOMElement()


    await act(async () => {

      fireEvent.blur(qtyInput, { target: { value: '0' } })


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

    await act(async () => {

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