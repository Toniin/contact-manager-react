import {createSlice} from '@reduxjs/toolkit'

export interface isSearchingState {
    value: boolean
}

const initialState: isSearchingState = {
    value: false,
}

export const isSearchingSlice = createSlice({
    name: 'isSearching',
    initialState,
    reducers: {
        isSearching: (state) => {
            state.value = true
        },
        isNotSearching: state => {
            state.value = initialState.value
        },

    }
})

export const {
    isSearching,
    isNotSearching
} = isSearchingSlice.actions

export default isSearchingSlice.reducer