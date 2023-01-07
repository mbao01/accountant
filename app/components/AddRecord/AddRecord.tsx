export const AddRecord = () => {
  const shades = [...Array(9).fill(0)];
  const colors = ["gray", "yellow", "red", "blue", "green", "purple"];

  return (
    <div>
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
          <button
            className={`rounded-lg bg-${color}-500 px-6 py-3 text-xs uppercase text-white`}
          >
            Add Record
          </button>
        </div>
      ))}
    </div>
  );
};
