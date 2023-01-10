import { render, screen } from "@testing-library/react";
import { CreateRecordType } from "./CreateRecordType";

describe("CreateRecordType", () => {
  it("should render", () => {
    render(<CreateRecordType />);
    expect(screen.getByText("Create Record Type")).toBeInTheDocument();
  });
});
