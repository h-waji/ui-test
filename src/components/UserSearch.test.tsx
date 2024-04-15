import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { UserSearch } from "./UserSearch";

jest.mock("axios");
const mockAxios = jest.mocked(axios);

const user = userEvent.setup();

describe("UserSearch", () => {
    beforeEach(() => {
        mockAxios.get.mockReset();
    });

    it("Submit a request to the API with the information entered into the form", async () => {
        const userInfo = {
            id: 1,
            name: "Miku"
        };
        const resp = { data: userInfo };
        mockAxios.get.mockResolvedValue(resp);

        render(<UserSearch />);

        const input = screen.getByRole("textbox");
        await user.type(input, userInfo.name);
        const button = screen.getByRole("button");
        await user.click(button);
        
        expect(mockAxios.get).toHaveBeenCalledWith(
            `/api/users?query=${userInfo.name}`
        )
    })

    it("The user information retrieved from the API is displayed on the screen.", async () => {
        const userInfo = {
            id: 1,
            name: "Miku"
        };
        const resp = { data: userInfo };
        mockAxios.get.mockResolvedValue(resp);

        render(<UserSearch />);

        const input = screen.getByRole("textbox");
        await user.type(input, userInfo.name);
        const button = screen.getByRole("button");
        await user.click(button);

        await waitFor(() => {
            expect(screen.getByText(userInfo.name)).toBeInTheDocument();
        })
    })
})