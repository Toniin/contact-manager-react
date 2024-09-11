import Header from "./Header";

import "@testing-library/jest-dom"
import {renderWithProviders} from "@/utils/test-utils";
import {store} from "@/redux/store";

describe("Header", () => {
    it("should return title", () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const screen = renderWithProviders(<Header/>, {store});
        const headerTitle = screen.getByTestId("headerTitle");

        expect(headerTitle).toHaveTextContent("Contact manager");
    })
})
