import { render, screen } from "@testing-library/react";
import { AddRecord } from "./AddRecord";

describe("AddRecord", () => {
  it("should render", () => {
    render(<AddRecord />);
    expect(screen.getByText("Add Record")).toBeInTheDocument();
  });
});
