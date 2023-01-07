import { Button } from "~/ui/Button";

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
          <div className="mb-2 flex items-end gap-6">
            <Button
              variant={variants[color]}
              disabled={color === "gray"}
              size="sm"
            >
              Add Record
            </Button>
            <Button
              variant={variants[color]}
              disabled={color === "gray"}
              size="md"
            >
              Add Record
            </Button>
            <Button
              variant={variants[color]}
              disabled={color === "gray"}
              size="lg"
            >
              Add Record
            </Button>
          </div>
          <div className="mb-2 flex items-end gap-6">
            <Button
              variant={variants[color]}
              disabled={color === "gray"}
              size="sm"
              outline
            >
              Add Record
            </Button>
            <Button
              variant={variants[color]}
              disabled={color === "gray"}
              size="md"
              outline
            >
              Add Record
            </Button>
            <Button
              variant={variants[color]}
              disabled={color === "gray"}
              size="lg"
              outline
            >
              Add Record
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
