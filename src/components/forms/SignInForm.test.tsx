import {contactsAPI} from "@/utils/axios";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {signIn} from "@/redux/actions/user.action";
import {useEffect} from "react";
import {waitFor} from "@testing-library/react";
import {renderWithProviders} from "@/utils/test-utils";
import {store} from "@/redux/store";
import "@testing-library/jest-dom"

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

test("dispatch signIn success", async () => {
    jest.spyOn(contactsAPI,'post').mockResolvedValue({data:{
            username: "admin",
            token: "token",
        }
    })

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const screen = renderWithProviders(<DispatchTest/>, {
        store,
    })

    const username = screen.getByTestId("username");
    const isSignIn = screen.getByTestId("isSignIn");

    expect(contactsAPI.post).toHaveBeenCalledWith("/auth/login", JSON.stringify({
        username: "admin",
        password: "password",
    }))

    await waitFor(() => expect(contactsAPI.post).toHaveBeenCalledTimes(1))

    expect(username).toHaveTextContent("admin")
    expect(isSignIn).toHaveTextContent("true")
});
