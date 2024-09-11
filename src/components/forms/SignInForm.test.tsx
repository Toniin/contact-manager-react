import {contactsAPI} from "@/utils/axios";
import React, {useEffect} from "react";
import {waitFor} from "@testing-library/react";
import {renderWithProviders} from "@/utils/test-utils";
import {store} from "@/redux/store";
import "@testing-library/jest-dom"
import SignInForm from "@components/forms/SignInForm";
import {userEvent} from "@testing-library/user-event";
import {signIn} from "@/redux/actions/user.action";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";

const mockedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockedNavigate
}))

beforeEach(async() => {
    jest.spyOn(contactsAPI, 'post').mockResolvedValue({
        data: {
            username: "admin",
            token: "token",
        }
    })

    // eslint-disable-next-line testing-library/no-render-in-setup,testing-library/render-result-naming-convention
    const screen = renderWithProviders(<SignInForm/>, {
        store,
    })

    const inputUsername = screen.getByTestId('inputUsernameSignInForm')
    const inputPassword = screen.getByTestId('inputPasswordSignInForm')
    const submitButton = screen.getByTestId('submitButtonSignInForm')

    await userEvent.type(inputUsername, 'username')
    await userEvent.type(inputPassword, 'password')
    await userEvent.click(submitButton)
});

describe("SignInForm", () => {
    it("should store username and put isSignIn to true (store Redux)", async () => {
        const DispatchTest = () => {
            const dispatch = useAppDispatch();
            const {username, isSignIn} = useAppSelector(state => state.persistedReducer)

            const user = {
                username: "admin",
                password: "password",
            }

            useEffect(() => {
                dispatch(signIn(user))
            }, []);

            return (
                <div>
                    <p data-testid="username">{username}</p>
                    <p data-testid="isSignIn">{JSON.stringify(isSignIn)}</p>
                </div>
            )
        }

        // eslint-disable-next-line testing-library/render-result-naming-convention
        const screen = renderWithProviders(<DispatchTest/>, {
            store,
        })

        const username = screen.getByTestId("username");
        const isSignIn = screen.getByTestId("isSignIn");

        await waitFor(() => expect(username).toHaveTextContent("admin"))
        await waitFor(() => expect(isSignIn).toHaveTextContent("true"))
    })

    it("should sign in user successfully", async () => {
        await waitFor(() => expect(contactsAPI.post).toHaveBeenCalledWith("/auth/login", JSON.stringify({
            username: "username",
            password: "password",
        })))

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith("/contacts"))
    })

    it("should stock JWT token in localStorage", async () => {
        await waitFor(() => {
                const token = localStorage.getItem("Token");
                expect(token).toBe("token")
            }
        )
    })

    it("should display error submit message", async () => {
        jest.spyOn(contactsAPI, 'post').mockResolvedValue({
            data: {
                isError: true,
                message: "Invalid username or password"
            }
        })

        // eslint-disable-next-line testing-library/render-result-naming-convention
        const screen = renderWithProviders(<SignInForm/>, {
            store,
        })

        await waitFor(() => {
                const errorSubmitMessage = screen.getAllByTestId('errorSubmitMessageSignInForm')
                expect(errorSubmitMessage[0]).toHaveTextContent("Invalid username or password")
            }
        )
    })
})
