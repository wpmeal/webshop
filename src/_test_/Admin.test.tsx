import React, { useEffect } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"

import Admin from '../pages/Admin';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { loggedInState } from '../atoms/loggedInState';
import { RecoilObserver } from '../RecoilObserver';
import { itemState } from '../atoms/ItemState';
import Login from '../components/Login';


const res = [
    {
        namn: "Apple",
        pris: 23,
        bild: "/images/apple.jpg",
        stock: 45
    },
    {
        namn: "Apelsin",
        pris: 32,
        bild: "/images/apelsin.jpg",
        stock: 88
    }
]

const res2 = { username: "omar", address: "Kastvindsgatan 2C lgh 2343, 41714, Gothenburg", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Il9EV…DAyfQ.wbFkOKAKwsh5s8kRLHIfHEs2Y_X6raAMcOAvnqKsqEA", role: "admin" }


describe('Test Admin Panel Page', () => {

    beforeEach(async () => {

        const mockValue: any = {
            json: jest.fn().mockResolvedValue(res)
        }

        const onChange = jest.fn();


        jest.spyOn(global, 'fetch').mockResolvedValue(mockValue)

        await act(async () => {
            render(
                <RecoilRoot>
                    <BrowserRouter>
                    <RecoilObserver node={loggedInState} onChange={onChange} />
                    <RecoilObserver node={itemState} onChange={onChange} />

                     <Admin />
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


        // fetch.mockImplementation(() => Promise.resolve(res))

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

       // expect(onChange).toHaveBeenCalledTimes(2);



    });

     it("Render product items", async () => {
        const name = screen.getByText(/Apple/i)
        //const pris = screen.getByText(/23/i)
        const bild = screen.getAllByAltText(/product image/i)[0].getAttribute('src')
        const stock = screen.getByText(/45/i)





        expect(name).toBeInTheDocument()
      //  expect(pris).toBeInTheDocument()
        expect(bild).toEqual("/images/apple.jpg")
        expect(stock).toBeInTheDocument()


        const name2 = screen.getByText(/Apelsin/i)
        const pris2 = screen.getByText(/32/i)
        const bild2 = screen.getAllByAltText(/product image/i)[1].getAttribute('src')
        const stock2 = screen.getByText(/88/i)

        expect(name2).toBeInTheDocument()
        expect(pris2).toBeInTheDocument()
        expect(bild2).toEqual("/images/apelsin.jpg")
        expect(stock2).toBeInTheDocument()

        // test links that only show to logged in user with an admin role
        const editBtn = screen.queryAllByText(/Edit/i)
        const deleteBtn = screen.queryAllByText(/Delete/i)
        if(res2.role == "admin"){
       
        expect(editBtn.length).toEqual(2)
        expect(deleteBtn.length).toEqual(2)
         
        }
        if(res2.role != "admin"){
            expect(editBtn.length).toEqual(0)
            expect(deleteBtn.length).toEqual(0)
        }

   
    })
    
it("Delete an item", async () => {

    expect(screen.queryByText(/Apple/i)).toBeInTheDocument()
    
    expect(screen.queryByText(/Apelsin/i)).toBeInTheDocument()
  
    const btn = screen.getAllByTestId("delete")[0]
  
    const res = [
      {
          namn: "Apelsin",
          pris: 32,
          bild: "/images/apelsin.jpg",
          stock: 88
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

  it("Edit an item", async () => {

    const editButton = screen.getAllByTestId('edit')[0]

    await act(async () => {

        userEvent.click(editButton)
  
      })

    const Name = screen.getByLabelText(/Name/i)

    const Pris = screen.getByLabelText(/Pris/i)

    const Bild = screen.getByLabelText(/Bild/i)

    const Stock = screen.getByLabelText(/Stock/i)


    expect(Name).toBeInTheDocument()
    expect(Pris).toBeInTheDocument()
    expect(Bild).toBeInTheDocument()
    expect(Stock).toBeInTheDocument()

    expect(Name).toHaveValue('Apple')
    expect(Pris).toHaveValue('23')
    expect(Bild).toHaveValue('/images/apple.jpg')
    expect(Stock).toHaveValue('45')

    userEvent.clear(Pris)

    userEvent.clear(Bild)

    userEvent.clear(Stock)

    userEvent.type(Pris, "78")

    userEvent.type(Bild, "/images/apple2.png")

    userEvent.type(Stock, "158")



    expect(Name).toHaveValue('Apple')

    expect(Pris).toHaveValue('78')

    expect(Bild).toHaveValue('/images/apple2.png')

    expect(Stock).toHaveValue('158')

    const button = screen.getByTestId('UpdateItemBtn')


  const res3 =    {
    namn: "Apple",
    pris: 78,
    bild: "/images/apple2.png",
    stock: 158
}
   // jest.restoreAllMocks();

    const mockValue: any = {
      json: jest.fn().mockResolvedValue(res3)
    }

    jest.spyOn(global, 'fetch').mockResolvedValue(mockValue)

    await act(async () => {

      userEvent.click(button)

    })

    const aa = screen.getByText(/Apple/i);

    const res_pris = screen.getByText(/78/i);
    const res_stock = screen.getByText(/158/i);

    expect(res_pris).toBeInTheDocument();
    expect(res_stock).toBeInTheDocument();

    expect(aa).toBeInTheDocument()

  
  })


  it("Add a new item", async () => {

    const addButton = screen.getByTestId('add')

    await act(async () => {

        userEvent.click(addButton)
  
      })

    const Name = screen.getByLabelText(/Name/i)

    const Pris = screen.getByLabelText(/Pris/i)

    const Bild = screen.getByLabelText(/Bild/i)

    const Stock = screen.getByLabelText(/Stock/i)


    expect(Name).toBeInTheDocument()
    expect(Pris).toBeInTheDocument()
    expect(Bild).toBeInTheDocument()
    expect(Stock).toBeInTheDocument()

    userEvent.clear(Name)


    userEvent.clear(Pris)

    userEvent.clear(Bild)

    userEvent.clear(Stock)

    userEvent.type(Name, "Annnas")

    userEvent.type(Pris, "66")

    userEvent.type(Bild, "/images/annnas.png")

    userEvent.type(Stock, "199")



    expect(Name).toHaveValue('Annnas')

    expect(Pris).toHaveValue('66')

    expect(Bild).toHaveValue('/images/annnas.png')

    expect(Stock).toHaveValue('199')

    const button = screen.getByTestId('UpdateItemBtn')


  const res3 =    {
    namn: "Annnas",
    pris: 66,
    bild: "/images/annnas.png",
    stock: 199
}
   // jest.restoreAllMocks();

    const mockValue: any = {
      json: jest.fn().mockResolvedValue(res3)
    }

    jest.spyOn(global, 'fetch').mockResolvedValue(mockValue)

    await act(async () => {

      userEvent.click(button)

    })

    const res_name = screen.getByText(/Annnas/i);
    const res_pris = screen.getByText(/66/i);
    const res_stock = screen.getByText(/199/i);

    expect(res_name).toBeInTheDocument()
    expect(res_pris).toBeInTheDocument();
    expect(res_stock).toBeInTheDocument();


  
  })
}
)