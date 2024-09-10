import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import {RootState} from "@/redux/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store: any
}

export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions
) {
    const {
        preloadedState = {},
        store,
        ...renderOptions
    } = extendedRenderOptions

    const Wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>{children}</Provider>
    )

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions })
    }
}