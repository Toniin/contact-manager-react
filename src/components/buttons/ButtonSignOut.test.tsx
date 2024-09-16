import {renderWithProviders} from "@/utils/test-utils";
import {store} from "@/redux/store";
import ButtonSignOut from "@components/buttons/ButtonSignOut";
import {userEvent} from "@testing-library/user-event";

const mockedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockedNavigate
}))

const setup = () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const screen = renderWithProviders(<ButtonSignOut/>, {
        store,
    })

    const buttonSignOut = screen.getByTestId('buttonSignOut')

    return {
        screen,
        buttonSignOut
    }
}

describe("ButtonSignOut", () => {
    describe('on success', () => {
        beforeEach(async () => {
            jest.spyOn(store, "dispatch");
            jest.spyOn(Storage.prototype, 'clear');

            const {buttonSignOut} = setup();

            await userEvent.click(buttonSignOut)
        })

        afterEach(() => {
            jest.clearAllMocks();
        })

        it("should clear localStorage", () => {
            expect(localStorage.clear).toHaveBeenCalled()
        })

        it("should be redirected to /sign-in", async () => {
            expect(mockedNavigate.mock.calls[0][0]).toBe("/sign-in")
        })

        it('should dispatch userSignOut', () => {
            expect(store.dispatch).toHaveBeenCalledWith({'type': 'user/userSignOut'})
        });
    });
})