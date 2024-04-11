import { render } from "@testing-library/react"
import SnapshotComponent from "./SnapshotComponent"

it("Snapshot", () => {
    const { container } = render(<SnapshotComponent text="HogeHogeSnap" />);
    expect(container).toMatchSnapshot();
})
