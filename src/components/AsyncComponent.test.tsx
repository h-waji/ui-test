import AsyncComponent from "./AsyncComponent"
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("AsyncComponent", () => {
    it("Clicking the button triggers asynchronous processing", async () => {
        render(<AsyncComponent />);
        expect(screen.getByText("Initial text")).toBeInTheDocument();

        const button = screen.getByRole("button");
        await act(async () => {
            user.click(button);
        });

        await waitFor(() => {
            expect(screen.getByText("Loading...")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText("Updated text")).toBeInTheDocument();
        }, {
            interval: 50, 
            timeout: 3000,
        })
    })
})