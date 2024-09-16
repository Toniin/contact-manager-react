import {renderWithProviders} from "@/utils/test-utils";
import {store} from "@/redux/store";
import ButtonDeleteContact from "@components/buttons/ButtonDeleteContact";
import {contactsAPI} from "@/utils/axios";
import {userEvent} from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { waitFor } from "@testing-library/react";

const PHONE_NUMBER = "(+33)1 23 45 67 89"
const BUTTON_DELETE_TEST_ID = "buttonDeleteContact"
const BUTTON_CLOSE_DIALOG = "buttonCloseDialog"

const setup = () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const screen = renderWithProviders(<ButtonDeleteContact phoneNumber={PHONE_NUMBER}/>, {
        store,
    })

    const buttonTriggerDialog = screen.getAllByTestId('buttonTriggerDialog')[0]

    return {
        screen,
        buttonTriggerDialog,
    }
}

describe('ButtonDeleteContact', () => {
    it('should delete contact', async () => {
        jest.spyOn(contactsAPI, 'delete').mockResolvedValue({
            data: {
                "message": "Contact deleted successfully"
            }
        })

        const {screen, buttonTriggerDialog} = setup()

        await userEvent.click(buttonTriggerDialog)
        await expect(screen.findByTestId(BUTTON_DELETE_TEST_ID)).resolves.toBeVisible()

        const buttonDeleteContact = screen.getByTestId(BUTTON_DELETE_TEST_ID)
        userEvent.click(buttonDeleteContact)

        await waitFor(() => expect(contactsAPI.delete).toHaveBeenCalledWith(`/delete/${PHONE_NUMBER}`), {timeout: 2000})
    });

    it("should not delete user", async () => {
        jest.spyOn(contactsAPI, 'delete')

        const {screen, buttonTriggerDialog} = setup()

        await userEvent.click(buttonTriggerDialog)
        await expect(screen.findByTestId(BUTTON_CLOSE_DIALOG)).resolves.toBeVisible()

        const buttonCloseDialog = screen.getByTestId(BUTTON_CLOSE_DIALOG)
        await userEvent.click(buttonCloseDialog)

        await waitFor(() => expect(contactsAPI.delete).not.toHaveBeenCalled(), {timeout: 2000})
    })
})