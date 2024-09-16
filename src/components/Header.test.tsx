import "@testing-library/jest-dom"
import {renderWithProviders} from "@/utils/test-utils";
import Header from "./Header";
import {store} from "@/redux/store";
import React from "react";

describe("Header", () => {
    it("should return title", () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const screen = renderWithProviders(<Header/>, {
            store,
        })

        const headerTitle = screen.getByTestId("headerTitle");

        expect(headerTitle).toHaveTextContent("Contact manager");
    })
})
