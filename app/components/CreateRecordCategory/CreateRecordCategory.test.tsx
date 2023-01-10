import { render, screen } from "@testing-library/react";
import { CreateRecordCategory } from "./CreateRecordCategory";

describe("CreateRecordCategory", () => {
  it("should render", () => {
    render(<CreateRecordCategory />);
    expect(screen.getByText("Create Record Category")).toBeInTheDocument();
  });
});
