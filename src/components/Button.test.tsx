import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
    it("Button tag is rendered", () => {
        render(<Button label="hoge" onClick={() => alert('click')} />);

        const element = screen.getByRole("button");
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("hoge");
    })
})
