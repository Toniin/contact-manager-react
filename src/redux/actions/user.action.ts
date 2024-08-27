import {createAsyncThunk} from "@reduxjs/toolkit";
import {SignInFormUser, SignUpFormUser} from "@/models/user.model";
import {contactsAPI} from "@/lib/axios";

export const signUp = createAsyncThunk(
    'signUp',
    (newUser: SignUpFormUser) => {
        return contactsAPI.post("/auth/register", JSON.stringify(newUser))
            .then(response => response.data)
            .catch(error => error.response.data);
    })

export const signIn = createAsyncThunk(
    'signIn',
    (user: SignInFormUser) => {
        return contactsAPI.post("/auth/login", JSON.stringify(user))
            .then(response => response.data)
            .catch(error => error.response.data);
    })