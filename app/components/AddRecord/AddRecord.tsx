import { Button, type ButtonProps } from "~/ui/Button";
import { Input } from "~/ui/Input";

export const AddRecord = () => {
  const shades = [...Array(9).fill(0)];
  const colors = ["gray", "yellow", "red", "blue", "green", "purple"];
  const variants: any = {
    gray: "primary",
    yellow: "warning",
    red: "danger",
    blue: "secondary",
    green: "success",
    purple: "primary",
  };
  const sizes: ButtonProps["size"][] = ["sm", "md", "lg"];
  const outlines = [false, true];

  return (
    <div className="py-5">
      <h2 className="my-8 text-xl font-bold">Accountant - Color Palette</h2>
      {colors.map((color) => (
        <div key={color} className="mb-10">
          <div className="my-4 flex flex-row gap-6">
            {shades.map((_, i) => {
              const level = (i + 1) * 100;
              return (
                <div key={i} className="text-center">
                  <span className="text-sm">{level}</span>
                  <div
                    className={`bg-${color}-${level} h-8 w-8 rounded-lg`}
                    style={{ printColorAdjust: "exact" }}
                  />
                </div>
              );
            })}
          </div>
          {outlines.map((outline) => (
            <div key={String(outline)} className="mb-2 flex items-end gap-6">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={variants[color]}
                  disabled={color === "gray"}
                  size={size}
                  outline={outline}
                >
                  Add Record
                </Button>
              ))}
            </div>
          ))}
          <div className="mb-8">
            <Input
              name="hss"
              size="lg"
              label="Hello World"
              placeholder="My place"
            />
          </div>
          <div className="mb-8">
            <Input
              disabled
              name="hss"
              size="md"
              label="Hello World"
              placeholder="My place"
            />
          </div>
          <div className="mb-10">
            <Input
              name="hi"
              size="sm"
              label="Hello World"
              placeholder="My place"
              required
            />
          </div>
        </div>
      ))}
    </div>
  );
};
