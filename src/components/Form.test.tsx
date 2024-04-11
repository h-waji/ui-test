import { render, screen } from "@testing-library/react"
import Form from "./Form"
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("Form", () => {
    it("In the initial state, the text box is empty", () => {
        render(<Form />);
        const input = screen.getByPlaceholderText("Enter text");
        expect(input).toBeInTheDocument();
        expect(input).toHaveTextContent("");
    })

    it("Submit the entered text", async () => {
        const alertSpy = jest.spyOn(window, "alert").mockReturnValue();

        render(<Form />);
        const input = screen.getByPlaceholderText("Enter text");
        await user.type(input, "HogeHoge");
        expect(screen.getByDisplayValue("HogeHoge")).toBeInTheDocument();

        const button = screen.getByRole("button");
        await user.click(button);

        expect(alertSpy).toHaveBeenCalledWith("submitted: HogeHoge");
        alertSpy.mockRestore();
    })
})
