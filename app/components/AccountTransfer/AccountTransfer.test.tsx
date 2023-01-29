import { render, screen } from "@testing-library/react";
import { AccountTransfer } from "./AccountTransfer";

describe("AddRecord", () => {
  it("should render", () => {
    render(
      <AccountTransfer
        fromAccount={{
          id: "",
          name: "",
          number: "",
          Currency: { code: "GBP" },
        }}
      />
    );
    expect(screen.getByText("Account Transfer")).toBeInTheDocument();
  });
});
