import { TagColor } from "@prisma/client";
import { render, screen } from "@testing-library/react";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("should render", () => {
    render(<Tag name={TagColor.BLUE} />);
    expect(screen.getByText("Tag")).toBeInTheDocument();
  });
});
