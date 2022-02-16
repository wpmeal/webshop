import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"

import Login from '../components/Login';
import { RecoilRoot } from 'recoil';

//import { mockSessionStorage } from "../../utils/mockSessionStorage"

//const { getItemMock, setItemMock } = mockSessionStorage();

describe('Test Login Component', () => {

  beforeEach(async () => {

    await act(async () => {
      render(
        <RecoilRoot>
          <Login />
        </RecoilRoot>
      );
    })

  })

  afterEach(() => {
    jest.restoreAllMocks();
  });


  it("Login a user", async () => {


    const username = screen.getByLabelText(/Email/i)

    const password = screen.getByLabelText(/password/i)

    expect(username).toBeInTheDocument()

    expect(password).toBeInTheDocument()


    userEvent.type(username, "omar")

    userEvent.type(password, "pwd456")


    expect(username).toHaveValue('omar')

    expect(password).toHaveValue('pwd456')

    const button = screen.getByTestId('loginBtn')

    const res = { username: "omar", address: "Kastvindsgatan 2C lgh 2343, 41714, Gothenburg", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Il9EV…DAyfQ.wbFkOKAKwsh5s8kRLHIfHEs2Y_X6raAMcOAvnqKsqEA" }

    // fetch.mockImplementation(() => Promise.resolve(res))

    const mockValue: any = {
      json: jest.fn().mockResolvedValue(res)
    }

    jest.spyOn(global, 'fetch').mockResolvedValue(mockValue)

    await act(async () => {


      userEvent.click(button)


    })

    const res_username = screen.getByText(/omar/i);
    const address = screen.getByText(/Kastvindsgatan 2C lgh 2343, 41714, Gothenburg/i);

    expect(res_username).toBeInTheDocument();
    expect(address).toBeInTheDocument();




  })
});
