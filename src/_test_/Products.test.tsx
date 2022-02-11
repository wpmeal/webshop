import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Products from '../components/Products';
import Home from '../pages/Home';


describe('Test Product Component', () => {

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

    beforeEach(async () => {

        // fetch.mockImplementation(() => Promise.resolve(res))

        const mockValue: any = {
            json: jest.fn().mockResolvedValue(res)
        }

        jest.spyOn(global, 'fetch').mockResolvedValue(mockValue)
        await act(async () => {
            render(
                <BrowserRouter>
                <Products/>
                </BrowserRouter>
                  

            );
        })

    })

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Render products correctly", async () => {

        const name = screen.getByText(/Apple/i)
        const pris = screen.getByText(/23/i)
        const bild = screen.getAllByAltText(/product image/i)[0].getAttribute("src")
        const stock = screen.getByText(/45/i)

        expect(name).toBeInTheDocument()
        expect(pris).toBeInTheDocument()
        expect(bild).toEqual(res[0].bild)
        expect(stock).toBeInTheDocument()

    })


    it("Filter products by name", async () => {

        const name1 = screen.getByText(/Apelsin/i)
        const pris1 = screen.getByText(/32/i)
        const stock1 = screen.getByText(/88/i)
        const btn = screen.getByText(/Filter By Name/i)
        const productName: any = screen.getByPlaceholderText(/Product Name/i)

        userEvent.type(productName, "Apple")

        expect(productName).toHaveValue('Apple')

        act(() => {

            userEvent.click(btn)

        })

        const name2 = screen.getByText(/Apple/i)
        const pris2 = screen.getByText(/23/i)
        const bild2 = screen.getAllByAltText(/product image/i)[0].getAttribute("src")
        const stock2 = screen.getByText(/45/i)

        expect(name2).toBeInTheDocument()
        expect(pris2).toBeInTheDocument()
        expect(bild2).toEqual(res[0].bild)
        expect(stock2).toBeInTheDocument()

        expect(name1).not.toBeInTheDocument()
        expect(pris1).not.toBeInTheDocument()
        expect(stock1).not.toBeInTheDocument()

    })


    it("Add a product to cart", async () => {

        const basketIcon = screen.getByTestId("basket")

        const basketItemNum:any = basketIcon.getAttribute("value")

        const btn = screen.getAllByTestId("AddToCart")[0]

        console.log(basketItemNum)

        //userEvent.click(btn)

        const mockValue: any = {
            json: jest.fn().mockResolvedValue((parseInt(basketItemNum))+1)
        }

        jest.spyOn(global, 'fetch').mockResolvedValue(mockValue)

        act(() => {

            userEvent.click(btn)

        })



      //  const basketIcon2 = screen.getByTestId("basket")

      //  const basketItemNum2:any = basketIcon2.getAttribute("value")

      //  expect(parseInt(basketItemNum2)).toEqual((parseInt(basketItemNum))+1)


    })
})