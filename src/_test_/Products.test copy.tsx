import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { loggedInState } from '../atoms/loggedInState';
import Products from '../components/Products';
import Home from '../pages/Home';
import { RecoilObserver } from '../RecoilObserver';


describe('Test Product Component', () => {

    const res: Array<any> = [
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
    //an arbitrary value  for the second fetch response mock that match cart items calucation procedure
    const res2 = { cartItemsNum: "57" }

    const res3 = { username: "omar", address: "Kastvindsgatan 2C lgh 2343, 41714, Gothenburg", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Il9EV…DAyfQ.wbFkOKAKwsh5s8kRLHIfHEs2Y_X6raAMcOAvnqKsqEA", role: "admin" }


    beforeEach(async () => {

        const mockValueOne: any = {
            json: jest.fn().mockResolvedValue(res)
        }

        const onChange = jest.fn();


        const mockValueTwo: any = {

            json: jest.fn().mockResolvedValue(res2)
        }

        // const spy = jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockValueOne).mockResolvedValueOnce(mockValueTwo)
        const spy = jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockValueOne)

        await act(async () => {
            render(
                <RecoilRoot>
                    <BrowserRouter>
                        <RecoilObserver node={loggedInState} onChange={onChange} />
                        <Home />
                    </BrowserRouter>
                </RecoilRoot>



            );
        })
        expect(spy).toHaveBeenCalled();

        //expect(spy).toBeCalledTimes(2);



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
            json: jest.fn().mockResolvedValue(res3)
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

    it("set cart items num to basket icon", async () => {

        const basketIcon = screen.getByTestId("basket")

        const basketItemNum: any = basketIcon.getAttribute("data-value")

        expect(basketItemNum).toEqual(res2.cartItemsNum)


    })


    it("Add a product to cart", async () => {

        const mockValueOne: any = {

            json: jest.fn().mockResolvedValue(res)
        }

        const mockValueTwo: any = {

            json: jest.fn().mockResolvedValue(res2)
        }

        const spy = jest.spyOn(global, 'fetch').mockResolvedValueOnce(mockValueOne).mockResolvedValueOnce(mockValueTwo)

        const btn = screen.getAllByTestId("1AddToCart")[0]


        await act(async () => {


            userEvent.click(btn)

        })

        expect(spy).toHaveBeenCalled();

        expect(spy).toBeCalledTimes(4);


        const message = screen.getByTestId("message").getAttribute("data-value")

        expect(message).toEqual("New item is added to cart")



    })

})

