import {createSlice} from '@reduxjs/toolkit'

export interface isEditingState {
    value: boolean,
    phoneNumber: string
}

const initialState: isEditingState = {
    value: false,
    phoneNumber: "",
}

export const isEditingSlice = createSlice({
    name: 'isEdit',
    initialState,
    reducers: {
        isEditing: (state, action) => {
            state.value = true
            state.phoneNumber = action.payload
        },
        isNotEditing: state => {
            state.value = initialState.value
            state.phoneNumber = initialState.phoneNumber
        },

    }
})

export const {
    isEditing,
    isNotEditing
} = isEditingSlice.actions

export default isEditingSlice.reducer