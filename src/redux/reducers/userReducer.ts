import {createSlice} from '@reduxjs/toolkit'
import {User} from "@/models/user.model";
import {signIn, signUp} from "@/redux/actions/user.action";

const initialState: User = {
    username: "",
    isSignIn: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSignOut: state => {
            state.username = initialState.username
            state.isSignIn = initialState.isSignIn
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (_state, action) => {
            if (action.payload.isError) {
                throw new Error(action.payload.message)
            }
        })

        builder.addCase(signIn.fulfilled, (state, action) => {
            if (action.payload.isError) {
                throw new Error(action.payload.message)
            }

            state.username = action.payload.username
            state.isSignIn = true
        })
    },
})

export const {
    userSignOut,
} = userSlice.actions

export default userSlice.reducer