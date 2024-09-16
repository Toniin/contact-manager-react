import {renderWithProviders} from "@/utils/test-utils";
import {store} from "@/redux/store";
import React from "react";
import {contactsAPI} from "@/utils/axios";
import {userEvent} from "@testing-library/user-event";
import AddContactForm from "@components/forms/AddContactForm";
import "@testing-library/jest-dom"
import {waitFor} from "@testing-library/react";
import {toast} from "sonner";

const mockedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockedNavigate
}))

jest.mock('use-mask-input', () => ({
    withMask: () => jest.fn()
}))

const setup = () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const screen = renderWithProviders(<AddContactForm/>, {
        store,
    })

    const inputName = screen.getAllByTestId('inputNameAddContactForm')[0]
    const inputPhoneNumber = screen.getAllByTestId('inputPhoneNumberAddContactForm')[0]
    const submitButton = screen.getAllByTestId('submitButtonAddContactForm')[0]

    return {
        screen,
        inputName,
        inputPhoneNumber,
        submitButton
    }
}

describe("AddContactForm", () => {
    describe("on success", () => {
        beforeEach(async () => {
            jest.spyOn(contactsAPI, 'post').mockResolvedValue({
                data: {
                    "message": "Contact added successfully"
                }
            })

            const {inputName, inputPhoneNumber, submitButton} = setup()

            await userEvent.type(inputName, 'John Doe')
            await userEvent.type(inputPhoneNumber, '(+33)1 23 45 67 89')
            await userEvent.click(submitButton)
        });

        it("should add contact and redirect to /contacts", async () => {
            await waitFor(() => expect(contactsAPI.post).toHaveBeenCalledWith("/add", JSON.stringify({
                name: "John Doe",
                phoneNumber: "(+33)1 23 45 67 89"
            })), {timeout: 2000})

            await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith("/contacts"))
        })
    })

    describe("on failure", () => {
        describe("when inputs is empty", () => {
            it("should display error inputs message", async () => {
                const {screen, submitButton} = setup()

                await userEvent.click(submitButton)

                await waitFor(() => {
                        const inputNameErrorMessage = screen.getByTestId('inputNameErrorMessageAddContactForm')
                        expect(inputNameErrorMessage).toHaveTextContent("Please enter name")
                    }
                )

                await waitFor(() => {
                        const inputPhoneNumberErrorMessage = screen.getByTestId('inputPhoneNumberErrorMessageAddContactForm')
                        expect(inputPhoneNumberErrorMessage).toHaveTextContent("Please enter valid phone number")
                    }
                )
            })
        })

        describe("when user haven't permission", () => {
            beforeEach(async () => {
                jest.spyOn(contactsAPI, 'post').mockResolvedValue({
                    data: []
                })

                const {inputName, inputPhoneNumber, submitButton} = setup()

                await userEvent.type(inputName, 'John Doe')
                await userEvent.type(inputPhoneNumber, '(+33)1 23 45 67 89')
                await userEvent.click(submitButton)
            });

            it("should display toast error", async () => {
                const toastError = jest.spyOn(toast, 'error')

                await waitFor(() => expect(toastError.mock.calls[0][0]).toBe("You do not have permission"), {timeout: 2000})
            })
        })
    })

})