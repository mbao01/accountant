import { render, screen } from "@testing-library/react";
import { NewAccount } from "./NewAccount";

describe("NewAccount", () => {
  it("should render", () => {
    render(<NewAccount />);
    expect(screen.getByText("New Account")).toBeInTheDocument();
  });
});
